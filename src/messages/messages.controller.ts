import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { OkResponseDto } from 'src/common/dtos/ok-response.dto';
import { ExpressRequest } from 'src/common/types/express-request';
import { HttpAuthGuard } from 'src/auth/http-auth.guard';
import { HttpAuthMongoRequiredGuard } from 'src/auth/http-auth-mongo-required.guard';

@UseGuards(HttpAuthGuard, HttpAuthMongoRequiredGuard)
@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/')
  async create(
    @Body() body: CreateMessageDto,
    @Req() req: ExpressRequest,
  ): Promise<OkResponseDto> {
    await this.messagesService.create(req.user, body);

    return { ok: true };
  }
}
