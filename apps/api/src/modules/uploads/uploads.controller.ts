import { Controller, Post, Body, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { InitiateUploadDto, GeneratePartUrlDto, CompleteUploadDto, AbortUploadDto } from './dto/uploads.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('initiate')
  async initiate(@Body() dto: InitiateUploadDto) {
    return this.uploadsService.initiateUpload(dto);
  }

  @Post('presigned-part')
  @HttpCode(HttpStatus.OK)
  async generatePresignedPart(@Body() dto: GeneratePartUrlDto) {
    return this.uploadsService.generatePartUploadUrl(dto);
  }

  @Post('part-complete')
  @HttpCode(HttpStatus.OK)
  async reportPartComplete(
    @Body('videoId') videoId: string,
    @Body('partNumber') partNumber: number,
  ) {
    return this.uploadsService.reportPartComplete(videoId, partNumber);
  }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  async complete(@Body() dto: CompleteUploadDto) {
    return this.uploadsService.completeUpload(dto);
  }

  @Post('abort')
  @HttpCode(HttpStatus.OK)
  async abort(@Body() dto: AbortUploadDto) {
    return this.uploadsService.abortUpload(dto);
  }

  @Get('session/:videoId')
  async getSessionInfo(@Param('videoId') videoId: string) {
    return this.uploadsService.getResumableInfo(videoId);
  }
}
