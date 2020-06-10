import { Processor, Process } from '@nestjs/bull';
import { MessagesService } from './messages.service';
import { Job } from 'bull';
import { MessageConsumerPayload } from './dtos/message-consumer-payload.dto';

@Processor('messages-queue')
export class MessagesConsumer {
  constructor(private readonly messagesService: MessagesService) {}

  @Process()
  async send(job: Job<MessageConsumerPayload>) {
    await this.messagesService.send(job.data);
    return {};
  }
}
