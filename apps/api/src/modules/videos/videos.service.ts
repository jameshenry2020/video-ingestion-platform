import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VideoStatus } from '../../../generated/prisma';



@Injectable()
export class VideosService {
  private readonly logger = new Logger(VideosService.name);

  constructor(private prisma: PrismaService) { }

  async getCatalog(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    try {
      const videos = await this.prisma.video.findMany({
        where: { status: VideoStatus.READY },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      });
      const total = await this.prisma.video.count({
        where: { status: VideoStatus.READY },
      });

      return {
        videos,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      this.logger.error('=== PRISMA getCatalog ERROR ===');
      this.logger.error(`Name: ${error.name}`);
      this.logger.error(`Code: ${error.code}`);
      this.logger.error(`Message: ${error.message}`);
      this.logger.error(`Meta: ${JSON.stringify(error.meta)}`);
      this.logger.error(`ClientVersion: ${error.clientVersion}`);
      throw error;
    }
  }

  async getById(id: string) {
    const video = await this.prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }
}
