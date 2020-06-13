import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { UseGuards } from '@nestjs/common';

import { OkResponseDto } from 'src/common/dtos/ok-response.dto';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';

import { WsMessageData } from './dtos/ws-message-data.dto';
import { UserEntity } from 'src/user/user.entity';

@WebSocketGateway({ transports: ['websocket'], namespace: 'messages' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('subscribe:messages')
  handleEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: WsMessageData,
  ): OkResponseDto {
    client.join(data.user.id.toString());
    return { ok: true };
  }

  emit<T>(user: UserEntity, event: string, data: T): void {
    this.server.to(user.id.toString()).emit(event, data);
  }
}
