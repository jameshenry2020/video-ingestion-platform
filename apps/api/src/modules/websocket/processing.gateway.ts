import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for dev; can be tightened in production
  },
  namespace: '/video-processing',
})
export class ProcessingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ProcessingGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Socket client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Socket client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-video')
  handleJoinVideo(@ConnectedSocket() client: Socket, @MessageBody() data: { videoId: string }) {
    if (!data || !data.videoId) {
      this.logger.warn(`Client ${client.id} tried to join room without videoId`);
      return;
    }
    const roomName = `video:${data.videoId}`;
    client.join(roomName);
    this.logger.log(`Client ${client.id} joined room: ${roomName}`);
  }

  emitVideoUpdate(
    videoId: string,
    payload: {
      videoId: string;
      status: string;
      progress: number;
      thumbnailUrl?: string | null;
      playbackUrl?: string | null;
      error?: string | null;
    },
  ) {
    const roomName = `video:${videoId}`;
    this.server.to(roomName).emit('video.processing.updated', payload);
    this.logger.log(`Emitted update to room ${roomName}: Status ${payload.status}, Progress ${payload.progress}%`);
  }
}
