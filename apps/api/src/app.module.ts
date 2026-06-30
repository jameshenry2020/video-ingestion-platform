import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './modules/storage/storage.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { VideosModule } from './modules/videos/videos.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { MediaModule } from './modules/media/media.module';
import { WorkersModule } from './modules/workers/workers.module';
import { ConfigModule } from './config/config.module';
import { AppConfig } from './config/app.config';
import { ConfigifyModule } from '@itgorillaz/configify';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(), // Initialize configify mapping
    ConfigModule,
    PrismaModule,
    StorageModule,
    WebSocketModule,
    MediaModule,
    WorkersModule,
    UploadsModule,
    VideosModule,
    BullModule.forRootAsync({
      inject: [AppConfig],
      useFactory: (config: AppConfig) => ({
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
