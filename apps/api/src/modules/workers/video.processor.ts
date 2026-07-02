import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { R2Service } from '../storage/r2.service';
import { FFmpegService, HlsResolution } from '../media/ffmpeg.service';
import { ProcessingGateway } from '../websocket/processing.gateway';
import { VideoStatus } from '../../../generated/prisma';
import { VIDEO_QUEUE } from '../queues/queue.constants';
import { AppConfiguration } from '../../config/app.config';
import * as path from 'path';
import * as fs from 'fs';

@Processor(VIDEO_QUEUE)
@Injectable()
export class VideoProcessor extends WorkerHost {
  private readonly logger = new Logger(VideoProcessor.name);

  constructor(
    private prisma: PrismaService,
    private r2Service: R2Service,
    private ffmpegService: FFmpegService,
    private gateway: ProcessingGateway,
    private config: AppConfiguration,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { videoId } = job.data;
    this.logger.log(`Processing job ${job.id} for video: ${videoId}`);

    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      this.logger.error(`Video ${videoId} not found in database`);
      return;
    }

    // Initialize or update processing job record in DB
    const dbJob = await this.prisma.videoProcessingJob.upsert({
      where: { jobId: job.id || 'unknown' },
      update: { status: 'RUNNING', progress: 0 },
      create: {
        videoId,
        jobId: job.id || 'unknown',
        status: 'RUNNING',
        progress: 0,
      },
    });

    const tmpDir = path.join(process.cwd(), 'tmp', videoId);

    try {
      // 0. Prepare local workspaces
      fs.mkdirSync(tmpDir, { recursive: true });
      const ext = path.extname(video.originalObjectKey) || '.mp4';
      const localOriginalPath = path.join(tmpDir, `original${ext}`);

      // Update progress to 0% - Downloading original
      await this.updateProgress(videoId, dbJob.id, VideoStatus.PROCESSING, 0);

      // Download original file from R2
      this.logger.log(`Downloading original video ${videoId} from R2 to ${localOriginalPath}`);
      await this.r2Service.downloadFile(video.originalObjectKey, localOriginalPath);

      // 1. Metadata Stage (10%)
      this.logger.log(`Extracting metadata for video ${videoId}`);
      await this.updateProgress(videoId, dbJob.id, VideoStatus.EXTRACTING_METADATA, 10);

      const metadata = await this.ffmpegService.extractMetadata(localOriginalPath);

      // Save metadata to database
      await this.prisma.video.update({
        where: { id: videoId },
        data: {
          duration: metadata.duration,
          width: metadata.width,
          height: metadata.height,
          codec: metadata.codec,
          fps: metadata.fps,
          bitrate: metadata.bitrate,
        },
      });

      // 2. Thumbnail Stage (30%)
      this.logger.log(`Generating thumbnail for video ${videoId}`);
      await this.updateProgress(videoId, dbJob.id, VideoStatus.GENERATING_THUMBNAIL, 30);

      const localThumbnailPath = path.join(tmpDir, 'thumbnail.jpg');
      const offset = metadata.duration > 5 ? 5 : metadata.duration / 2;
      await this.ffmpegService.generateThumbnail(localOriginalPath, localThumbnailPath, offset);

      const thumbnailKey = `videos/thumbnails/${videoId}/thumbnail.jpg`;
      await this.r2Service.uploadFile(localThumbnailPath, thumbnailKey, 'image/jpeg');

      const publicUrl = this.config.r2PublicUrl;
      const thumbnailUrl = `${publicUrl}/${thumbnailKey}`;

      await this.prisma.video.update({
        where: { id: videoId },
        data: { thumbnailUrl },
      });

      // Emit gateway notification with the newly available thumbnail
      this.gateway.emitVideoUpdate(videoId, {
        videoId,
        status: VideoStatus.GENERATING_THUMBNAIL,
        progress: 30,
        thumbnailUrl,
      });

      // 3. HLS Stage (50% - 90%)
      this.logger.log(`Generating HLS streams for video ${videoId}`);
      await this.updateProgress(videoId, dbJob.id, VideoStatus.GENERATING_HLS, 50);

      const allResolutions: HlsResolution[] = [
        { name: '360', height: 360, bitrate: '800k', audioBitrate: '96k', bandwidth: 800000, resolutionStr: '640x360' },
        { name: '720', height: 720, bitrate: '2500k', audioBitrate: '128k', bandwidth: 2500000, resolutionStr: '1280x720' },
        { name: '1080', height: 1080, bitrate: '5000k', audioBitrate: '192k', bandwidth: 5000000, resolutionStr: '1920x1080' },
      ];

      // Downscaling strategy: only transcode resolutions equal or smaller than the input height
      const targetResolutions = allResolutions.filter((r) => r.height <= metadata.height);
      if (targetResolutions.length === 0) {
        targetResolutions.push(allResolutions[0]);
      }

      this.logger.log(`Selected resolutions for ${videoId}: ${targetResolutions.map((r) => r.name).join(', ')}`);

      const hlsDir = path.join(tmpDir, 'hls');
      fs.mkdirSync(hlsDir, { recursive: true });

      const weight = 40 / targetResolutions.length;
      let lastReportedProgress = 50;

      for (let i = 0; i < targetResolutions.length; i++) {
        const resolution = targetResolutions[i];

        await this.ffmpegService.transcodeToHls(
          localOriginalPath,
          hlsDir,
          resolution,
          async (percent) => {
            const overallProgress = Math.floor(50 + i * weight + (percent * weight) / 100);
            if (overallProgress > lastReportedProgress) {
              lastReportedProgress = overallProgress;
              await this.updateProgress(videoId, dbJob.id, VideoStatus.GENERATING_HLS, overallProgress);
            }
          },
        );
      }

      // Write HLS master playlist referencing variant streams
      this.ffmpegService.writeMasterPlaylist(hlsDir, targetResolutions);

      // Upload HLS outputs to Cloudflare R2
      await this.updateProgress(videoId, dbJob.id, VideoStatus.GENERATING_HLS, 90);
      this.logger.log(`Uploading HLS folder contents to R2 for video ${videoId}`);
      await this.uploadDirectoryToR2(hlsDir, `videos/hls/${videoId}`);

      // 4. Complete Stage (100%)
      const playbackUrl = `${publicUrl}/videos/hls/${videoId}/master.m3u8`;

      await this.prisma.video.update({
        where: { id: videoId },
        data: {
          status: VideoStatus.READY,
          processingProgress: 100,
          playbackUrl,
        },
      });

      await this.prisma.videoProcessingJob.update({
        where: { id: dbJob.id },
        data: {
          status: 'COMPLETED',
          progress: 100,
          completedAt: new Date(),
        },
      });

      this.gateway.emitVideoUpdate(videoId, {
        videoId,
        status: VideoStatus.READY,
        progress: 100,
        playbackUrl,
        thumbnailUrl,
      });

      this.logger.log(`Finished processing job ${job.id} for video: ${videoId}`);
    } catch (error: any) {
      this.logger.error(`Error processing video ${videoId} in job ${job.id}: ${error.message}`, error.stack);

      await this.prisma.video.update({
        where: { id: videoId },
        data: { status: VideoStatus.FAILED, processingProgress: 0 },
      });

      await this.prisma.videoProcessingJob.update({
        where: { id: dbJob.id },
        data: {
          status: 'FAILED',
          progress: 0,
          error: error.message,
          completedAt: new Date(),
        },
      });

      this.gateway.emitVideoUpdate(videoId, {
        videoId,
        status: VideoStatus.FAILED,
        progress: 0,
        error: error.message,
      });

      throw error;
    } finally {
      // 5. Cleanup Workspace
      try {
        if (fs.existsSync(tmpDir)) {
          this.logger.log(`Cleaning up local processing directory: ${tmpDir}`);
          fs.rmSync(tmpDir, { recursive: true, force: true });
        }
      } catch (cleanupErr: any) {
        this.logger.warn(`Failed to clean up tmp directory ${tmpDir}: ${cleanupErr.message}`);
      }
    }
  }

  private async updateProgress(videoId: string, dbJobId: string, status: VideoStatus, progress: number) {
    await this.prisma.video.update({
      where: { id: videoId },
      data: { status, processingProgress: progress },
    });

    await this.prisma.videoProcessingJob.update({
      where: { id: dbJobId },
      data: { progress },
    });

    this.gateway.emitVideoUpdate(videoId, {
      videoId,
      status,
      progress,
    });
  }

  private async uploadDirectoryToR2(localDir: string, r2Prefix: string): Promise<void> {
    const walk = async (dir: string): Promise<string[]> => {
      let results: string[] = [];
      const list = fs.readdirSync(dir);

      for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
          results = results.concat(await walk(filePath));
        } else {
          results.push(filePath);
        }
      }
      return results;
    };

    const files = await walk(localDir);

    for (const file of files) {
      const relativePath = path.relative(localDir, file).replace(/\\/g, '/');
      const r2Key = `${r2Prefix}/${relativePath}`;

      let contentType = 'application/octet-stream';
      const ext = path.extname(file).toLowerCase();

      if (ext === '.m3u8') {
        contentType = 'application/x-mpegURL';
      } else if (ext === '.ts') {
        contentType = 'video/MP2T';
      } else if (ext === '.jpg' || ext === '.jpeg') {
        contentType = 'image/jpeg';
      }

      await this.r2Service.uploadFile(file, r2Key, contentType);
    }
  }
}
