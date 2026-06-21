import { Module, Global } from '@nestjs/common';
import { FFmpegService } from './ffmpeg.service';

@Global()
@Module({
  providers: [FFmpegService],
  exports: [FFmpegService],
})
export class MediaModule {}
