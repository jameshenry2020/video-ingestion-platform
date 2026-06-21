import { Module, Global } from '@nestjs/common';
import { ProcessingGateway } from './processing.gateway';

@Global()
@Module({
  providers: [ProcessingGateway],
  exports: [ProcessingGateway],
})
export class WebSocketModule {}
