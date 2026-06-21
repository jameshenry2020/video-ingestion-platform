import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { UploadsRepository } from './uploads.repository';
import { BullModule } from '@nestjs/bullmq';
import { VIDEO_QUEUE } from '../queues/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: VIDEO_QUEUE,
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService, UploadsRepository],
  exports: [UploadsService],
})
export class UploadsModule {}
