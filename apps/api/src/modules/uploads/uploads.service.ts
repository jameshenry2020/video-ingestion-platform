import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { UploadsRepository } from './uploads.repository';
import { R2Service } from '../storage/r2.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VIDEO_QUEUE, VIDEO_PROCESS_JOB } from '../queues/queue.constants';
import { InitiateUploadDto, GeneratePartUrlDto, CompleteUploadDto, AbortUploadDto } from './dto/uploads.dto';

import * as path from 'path';

// Using crypto.randomUUID() from Node.js is native and doesn't require importing external packages! This is clean and robust.
import { randomUUID } from 'crypto';
import { UploadSessionStatus } from 'src/generated/prisma';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private readonly CHUNK_SIZE = 10 * 1024 * 1024; // 10MB default chunk size

  constructor(
    private repository: UploadsRepository,
    private r2Service: R2Service,
    @InjectQueue(VIDEO_QUEUE) private videoQueue: Queue,
  ) { }

  async initiateUpload(ownerId: string, dto: InitiateUploadDto) {
    // Validate mimeType is a video
    if (!dto.mimeType.startsWith('video/')) {
      throw new BadRequestException('Only video file uploads are supported');
    }

    const videoId = randomUUID();
    const ext = path.extname(dto.fileName).toLowerCase() || '.mp4';
    const objectKey = `videos/raw/${videoId}/original${ext}`;

    // Create multipart upload in R2 S3
    const uploadId = await this.r2Service.createMultipartUpload(objectKey, dto.mimeType);

    // Calculate total number of parts (chunks)
    const totalParts = Math.ceil(dto.fileSize / this.CHUNK_SIZE);

    // Expires in 24 hours
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const { video, session } = await this.repository.createVideoAndSession({
      ownerId,
      originalFileName: dto.fileName,
      mimeType: dto.mimeType,
      fileSize: dto.fileSize,
      objectKey,
      uploadId,
      totalParts,
      expiresAt,
    });

    return {
      videoId: video.id,
      uploadId: session.uploadId,
      objectKey: session.objectKey,
      chunkSize: this.CHUNK_SIZE,
    };
  }

  async generatePartUploadUrl(ownerId: string, dto: GeneratePartUrlDto) {
    const session = await this.repository.findSessionByVideoId(dto.videoId);
    if (!session) {
      throw new NotFoundException('Upload session not found');
    }

    if (session.video.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this video session');
    }

    if (session.status !== UploadSessionStatus.ACTIVE) {
      throw new BadRequestException(`Upload session is not active (Status: ${session.status})`);
    }

    if (session.expiresAt < new Date()) {
      throw new BadRequestException('Upload session has expired');
    }

    if (dto.partNumber < 1 || dto.partNumber > session.totalParts) {
      throw new BadRequestException(`Invalid part number. Must be between 1 and ${session.totalParts}`);
    }

    const url = await this.r2Service.generatePartUploadUrl(session.objectKey, dto.uploadId, dto.partNumber);
    return { url };
  }

  async reportPartComplete(ownerId: string, videoId: string, partNumber: number) {
    const session = await this.repository.findSessionByVideoId(videoId);
    if (!session) {
      throw new NotFoundException('Upload session not found');
    }

    if (session.video.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this video session');
    }

    if (session.status !== UploadSessionStatus.ACTIVE) {
      throw new BadRequestException('Upload session is not active');
    }

    // Increment uploaded parts
    const nextUploadedCount = Math.min(session.uploadedParts + 1, session.totalParts);
    const progress = Math.floor((nextUploadedCount / session.totalParts) * 100);

    const updatedSession = await this.repository.updateSessionUploadedParts(session.id, nextUploadedCount, progress);

    return {
      videoId: updatedSession.videoId,
      uploadedParts: updatedSession.uploadedParts,
      totalParts: updatedSession.totalParts,
      uploadProgress: updatedSession.video.uploadProgress,
    };
  }

  async completeUpload(ownerId: string, dto: CompleteUploadDto) {
    const session = await this.repository.findSessionByVideoId(dto.videoId);
    if (!session) {
      throw new NotFoundException('Upload session not found');
    }

    if (session.video.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this video session');
    }

    if (session.status !== UploadSessionStatus.ACTIVE) {
      throw new BadRequestException('Upload session is not active');
    }

    // Complete Multipart Upload in R2
    const s3Parts = dto.parts.map((p) => ({
      ETag: p.ETag,
      PartNumber: p.PartNumber,
    }));

    await this.r2Service.completeMultipartUpload(session.objectKey, dto.uploadId, s3Parts);

    // Update database status
    await this.repository.completeUploadSession(dto.videoId, session.id);

    // Queue background processing job in BullMQ
    const job = await this.videoQueue.add(
      VIDEO_PROCESS_JOB,
      { videoId: dto.videoId },
      {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    );

    this.logger.log(`Enqueued video processing job ${job.id} for video ${dto.videoId}`);

    return { success: true };
  }

  async abortUpload(ownerId: string, dto: AbortUploadDto) {
    const session = await this.repository.findSessionByVideoId(dto.videoId);
    if (!session) {
      throw new NotFoundException('Upload session not found');
    }

    if (session.video.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this video session');
    }

    // Abort in R2
    await this.r2Service.abortMultipartUpload(session.objectKey, session.uploadId);

    // Mark aborted in Database
    await this.repository.abortUploadSession(dto.videoId, session.id);

    return { success: true };
  }

  async getResumableInfo(ownerId: string, videoId: string) {
    const session = await this.repository.findSessionByVideoId(videoId);
    if (!session) {
      throw new NotFoundException('Upload session not found');
    }

    if (session.video.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this video session');
    }

    // Query Cloudflare R2 directly for list of successfully uploaded parts
    const r2Parts = await this.r2Service.listUploadedParts(session.objectKey, session.uploadId);

    // Update database with R2's count of successfully uploaded parts
    if (r2Parts.length !== session.uploadedParts) {
      const progress = Math.floor((r2Parts.length / session.totalParts) * 100);
      await this.repository.updateSessionUploadedParts(session.id, r2Parts.length, progress);
    }

    return {
      uploadId: session.uploadId,
      objectKey: session.objectKey,
      totalParts: session.totalParts,
      chunkSize: this.CHUNK_SIZE,
      uploadedParts: r2Parts.map((p) => p.PartNumber),
      parts: r2Parts, // returns list of { PartNumber, ETag }
    };
  }
}
