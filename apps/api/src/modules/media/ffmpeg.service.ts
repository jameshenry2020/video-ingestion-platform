import { Injectable, Logger } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fs from 'fs';

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  codec: string;
  fps: number;
  bitrate: number;
}

export interface HlsResolution {
  name: string;
  height: number;
  bitrate: string;
  audioBitrate: string;
  bandwidth: number;
  resolutionStr: string;
}

@Injectable()
export class FFmpegService {
  private readonly logger = new Logger(FFmpegService.name);

  async extractMetadata(filePath: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          this.logger.error(`ffprobe error on file ${filePath}: ${err.message}`);
          return reject(err);
        }

        const format = metadata.format;
        const videoStream = metadata.streams.find((s) => s.codec_type === 'video');

        if (!videoStream) {
          return reject(new Error('No video stream found in media file'));
        }

        // Parse frame rate (e.g. "30/1" or "2997/100")
        let fps = 30;
        if (videoStream.r_frame_rate) {
          const parts = videoStream.r_frame_rate.split('/');
          if (parts.length === 2) {
            const num = parseFloat(parts[0]);
            const den = parseFloat(parts[1]);
            if (den !== 0) fps = num / den;
          }
        }

        resolve({
          duration: format.duration ? parseFloat(format.duration) : 0,
          width: videoStream.width || 0,
          height: videoStream.height || 0,
          codec: videoStream.codec_name || 'unknown',
          fps: Math.round(fps * 100) / 100,
          bitrate: format.bit_rate ? parseInt(format.bit_rate) : 0,
        });
      });
    });
  }

  async generateThumbnail(inputPath: string, outputPath: string, offsetSeconds = 5): Promise<void> {
    return new Promise((resolve, reject) => {
      // Ensure target directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      ffmpeg(inputPath)
        .seekInput(offsetSeconds)
        .frames(1)
        .output(outputPath)
        .outputOptions(['-vcodec mjpeg', '-f image2'])
        .on('end', () => {
          this.logger.log(`Thumbnail generated successfully at ${outputPath}`);
          resolve();
        })
        .on('error', (err) => {
          this.logger.error(`ffmpeg thumbnail error: ${err.message}`);
          reject(err);
        })
        .run();
    });
  }

  async transcodeToHls(
    inputPath: string,
    outputDir: string,
    resolution: HlsResolution,
    onProgress?: (percent: number) => void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const resDir = path.join(outputDir, resolution.name);
      fs.mkdirSync(resDir, { recursive: true });

      const playlistPath = path.join(resDir, 'index.m3u8');
      const segmentPattern = path.join(resDir, 'segment%d.ts');

      ffmpeg(inputPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .size(`?x${resolution.height}`) // Maintain aspect ratio based on height
        .outputOptions([
          '-preset medium',
          '-crf 23',
          `-b:v ${resolution.bitrate}`,
          `-b:a ${resolution.audioBitrate}`,
          '-hls_time 6',
          '-hls_playlist_type vod',
          `-hls_segment_filename ${segmentPattern}`,
        ])
        .output(playlistPath)
        .on('progress', (progress) => {
          if (progress.percent !== undefined && onProgress) {
            onProgress(Math.max(0, Math.min(100, progress.percent)));
          }
        })
        .on('end', () => {
          this.logger.log(`Transcoded resolution ${resolution.name} successfully`);
          resolve();
        })
        .on('error', (err) => {
          this.logger.error(`ffmpeg transcode error for ${resolution.name}: ${err.message}`);
          reject(err);
        })
        .run();
    });
  }

  writeMasterPlaylist(outputDir: string, resolutions: HlsResolution[]): void {
    let content = '#EXTM3U\n#EXT-X-VERSION:3\n\n';
    
    for (const res of resolutions) {
      content += `#EXT-X-STREAM-INF:BANDWIDTH=${res.bandwidth},RESOLUTION=${res.resolutionStr}\n`;
      content += `${res.name}/index.m3u8\n\n`;
    }

    fs.writeFileSync(path.join(outputDir, 'master.m3u8'), content, 'utf8');
    this.logger.log(`Master playlist written at ${path.join(outputDir, 'master.m3u8')}`);
  }
}
