import { Controller, Post, Body, Get, Param, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { InitiateUploadDto, GeneratePartUrlDto, CompleteUploadDto, AbortUploadDto } from './dto/uploads.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('initiate')
  async initiate(@CurrentUser() user: any, @Body() dto: InitiateUploadDto) {
    return this.uploadsService.initiateUpload(user.id, dto);
  }

  @Post('presigned-part')
  @HttpCode(HttpStatus.OK)
  async generatePresignedPart(@CurrentUser() user: any, @Body() dto: GeneratePartUrlDto) {
    return this.uploadsService.generatePartUploadUrl(user.id, dto);
  }

  @Post('part-complete')
  @HttpCode(HttpStatus.OK)
  async reportPartComplete(
    @CurrentUser() user: any,
    @Body('videoId') videoId: string,
    @Body('partNumber') partNumber: number,
  ) {
    return this.uploadsService.reportPartComplete(user.id, videoId, partNumber);
  }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  async complete(@CurrentUser() user: any, @Body() dto: CompleteUploadDto) {
    return this.uploadsService.completeUpload(user.id, dto);
  }

  @Post('abort')
  @HttpCode(HttpStatus.OK)
  async abort(@CurrentUser() user: any, @Body() dto: AbortUploadDto) {
    return this.uploadsService.abortUpload(user.id, dto);
  }

  @Get('session/:videoId')
  async getSessionInfo(@CurrentUser() user: any, @Param('videoId') videoId: string) {
    return this.uploadsService.getResumableInfo(user.id, videoId);
  }
}
