import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './modules/storage/storage.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { VideosModule } from './modules/videos/videos.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { MediaModule } from './modules/media/media.module';
import { WorkersModule } from './modules/workers/workers.module';
import { ConfigifyModule } from '@itgorillaz/configify';
import { BullModule } from '@nestjs/bullmq';
import { AppConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(), // Initialize configify mapping
    PrismaModule,
    StorageModule,
    WebSocketModule,
    MediaModule,
    WorkersModule,
    UploadsModule,
    VideosModule,
    BullModule.forRootAsync({
      inject: [AppConfiguration],
      useFactory: (config: AppConfiguration) => ({
        connection: {
          host: config.redisHost,
          port: config.redisPort,
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
  ],
})
export class AppModule { }
