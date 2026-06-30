import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  async getCatalog(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 10;
    return this.videosService.getCatalog(pageNum, limitNum);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const video = await this.videosService.getById(id);
    
    // Return compatible schema including resolution and bigints mapped to strings/numbers
    return {
      ...video,
      fileSize: video.fileSize.toString(), // BigInt needs serialization to prevent JSON conversion crashes
    };
  }
}
