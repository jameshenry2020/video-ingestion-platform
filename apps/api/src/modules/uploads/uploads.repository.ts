import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VideoStatus, UploadSessionStatus, Video, UploadSession } from '../../../generated/prisma';

@Injectable()
export class UploadsRepository {
  constructor(private prisma: PrismaService) { }

  async createVideoAndSession(data: {
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    objectKey: string;
    uploadId: string;
    totalParts: number;
    expiresAt: Date;
  }): Promise<{ video: Video; session: UploadSession }> {
    return this.prisma.$transaction(async (tx) => {
      const video = await tx.video.create({
        data: {
          originalFileName: data.originalFileName,
          mimeType: data.mimeType,
          fileSize: data.fileSize,
          originalObjectKey: data.objectKey,
          status: VideoStatus.INITIATED,
          uploadProgress: 0,
        },
      });

      const session = await tx.uploadSession.create({
        data: {
          videoId: video.id,
          uploadId: data.uploadId,
          objectKey: data.objectKey,
          status: UploadSessionStatus.ACTIVE,
          totalParts: data.totalParts,
          expiresAt: data.expiresAt,
        },
      });

      return { video, session };
    });
  }

  async findSessionByVideoId(videoId: string) {
    return this.prisma.uploadSession.findUnique({
      where: { videoId },
      include: { video: true },
    });
  }

  async updateSessionUploadedParts(sessionId: string, count: number, uploadProgress: number) {
    return this.prisma.uploadSession.update({
      where: { id: sessionId },
      data: {
        uploadedParts: count,
        video: {
          update: {
            uploadProgress,
            status: VideoStatus.UPLOADING,
          },
        },
      },
      include: { video: true },
    });
  }

  async completeUploadSession(videoId: string, sessionId: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.uploadSession.update({
        where: { id: sessionId },
        data: { status: UploadSessionStatus.COMPLETED },
      });

      return tx.video.update({
        where: { id: videoId },
        data: {
          status: VideoStatus.UPLOADED,
          uploadProgress: 100,
        },
      });
    });
  }

  async abortUploadSession(videoId: string, sessionId: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.uploadSession.update({
        where: { id: sessionId },
        data: { status: UploadSessionStatus.ABORTED },
      });

      return tx.video.update({
        where: { id: videoId },
        data: {
          status: VideoStatus.FAILED,
        },
      });
    });
  }

  async updateVideoStatus(videoId: string, status: VideoStatus) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: { status },
    });
  }
}
