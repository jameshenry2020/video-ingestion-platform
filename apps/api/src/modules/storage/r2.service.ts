import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  GetObjectCommand,
  PutObjectCommand,
  ListPartsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppConfig } from '../../config/app.config';
import * as fs from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

@Injectable()
export class R2Service {
  private readonly logger = new Logger(R2Service.name);
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private config: AppConfig) {
    const endpoint = config.r2Endpoint;
    const accessKeyId = config.r2AccessKeyId;
    const secretAccessKey = config.r2SecretAccessKey;
    this.bucketName = config.r2BucketName;

    if (!endpoint || !accessKeyId || !secretAccessKey) {
      this.logger.warn(
        'R2 configuration variables (R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) are missing in environment configuration.',
      );
    }

    this.s3Client = new S3Client({
      endpoint,
      region: 'auto',
      credentials: {
        accessKeyId: accessKeyId || 'placeholder-access-key',
        secretAccessKey: secretAccessKey || 'placeholder-secret-key',
      },
      forcePathStyle: true, // Required for Cloudflare R2
    });
  }

  async createMultipartUpload(objectKey: string, mimeType: string): Promise<string> {
    try {
      const command = new CreateMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: objectKey,
        ContentType: mimeType,
      });
      const response = await this.s3Client.send(command);
      if (!response.UploadId) {
        throw new Error('No UploadId returned from S3/R2');
      }
      return response.UploadId;
    } catch (error: any) {
      this.logger.error(`Failed to initiate multipart upload for ${objectKey}: ${error.message}`);
      throw new InternalServerErrorException('Failed to initiate R2 upload session');
    }
  }

  async generatePartUploadUrl(objectKey: string, uploadId: string, partNumber: number): Promise<string> {
    try {
      const command = new UploadPartCommand({
        Bucket: this.bucketName,
        Key: objectKey,
        UploadId: uploadId,
        PartNumber: partNumber,
      });

      // Expires in 5 minutes (300 seconds)
      return await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    } catch (error: any) {
      this.logger.error(`Failed to generate signed URL for part ${partNumber} of upload ${uploadId}: ${error.message}`);
      throw new InternalServerErrorException('Failed to generate presigned upload part URL');
    }
  }

  async completeMultipartUpload(
    objectKey: string,
    uploadId: string,
    parts: { ETag: string; PartNumber: number }[],
  ): Promise<void> {
    try {
      const sortedParts = [...parts].sort((a, b) => a.PartNumber - b.PartNumber);
      const command = new CompleteMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: objectKey,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: sortedParts,
        },
      });
      await this.s3Client.send(command);
    } catch (error: any) {
      this.logger.error(`Failed to complete multipart upload for ${objectKey} (ID: ${uploadId}): ${error.message}`);
      throw new InternalServerErrorException('Failed to finalize R2 upload session');
    }
  }

  async abortMultipartUpload(objectKey: string, uploadId: string): Promise<void> {
    try {
      const command = new AbortMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: objectKey,
        UploadId: uploadId,
      });
      await this.s3Client.send(command);
    } catch (error: any) {
      this.logger.error(`Failed to abort multipart upload for ${objectKey} (ID: ${uploadId}): ${error.message}`);
    }
  }

  async listUploadedParts(objectKey: string, uploadId: string): Promise<{ PartNumber: number; ETag: string }[]> {
    try {
      const parts: { PartNumber: number; ETag: string }[] = [];
      let partNumberMarker: number | undefined = undefined;
      let hasMore = true;

      while (hasMore) {
        const command: any = new ListPartsCommand({
          Bucket: this.bucketName,
          Key: objectKey,
          UploadId: uploadId,
          PartNumberMarker: partNumberMarker,
        });

        const response = await this.s3Client.send(command);

        if (response.Parts) {
          for (const part of response.Parts) {
            if (part.PartNumber !== undefined && part.ETag !== undefined) {
              parts.push({
                PartNumber: part.PartNumber,
                ETag: part.ETag,
              });
            }
          }
        }

        if (response.IsTruncated && response.NextPartNumberMarker !== undefined) {
          partNumberMarker = response.NextPartNumberMarker;
        } else {
          hasMore = false;
        }
      }

      return parts;
    } catch (error: any) {
      this.logger.error(`Failed to list parts for ${objectKey} (ID: ${uploadId}): ${error.message}`);
      return [];
    }
  }

  async uploadFile(localPath: string, objectKey: string, contentType: string): Promise<void> {
    try {
      const fileStream = fs.createReadStream(localPath);
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: objectKey,
        Body: fileStream,
        ContentType: contentType,
      });
      await this.s3Client.send(command);
    } catch (error: any) {
      this.logger.error(`Failed to upload local file ${localPath} to ${objectKey}: ${error.message}`);
      throw new InternalServerErrorException('Failed to upload file to R2');
    }
  }

  async downloadFile(objectKey: string, localPath: string): Promise<void> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: objectKey,
      });
      const response = await this.s3Client.send(command);
      if (!response.Body) {
        throw new Error(`Empty body returned for object ${objectKey}`);
      }

      const fileWriteStream = fs.createWriteStream(localPath);
      await pipeline(response.Body as Readable, fileWriteStream);
    } catch (error: any) {
      this.logger.error(`Failed to download ${objectKey} to local path ${localPath}: ${error.message}`);
      throw new InternalServerErrorException('Failed to download media file from R2');
    }
  }
}
