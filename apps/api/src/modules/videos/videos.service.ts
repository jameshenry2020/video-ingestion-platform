import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VideoStatus } from 'src/generated/prisma';


@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) { }

  async getCatalog(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [videos, total] = await this.prisma.$transaction([
      this.prisma.video.findMany({
        where: { status: VideoStatus.READY },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.video.count({
        where: { status: VideoStatus.READY },
      }),
    ]);

    return {
      videos,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
