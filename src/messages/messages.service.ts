import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { TargetService } from 'src/target/target.service';
import { AccountService } from 'src/accounts/account.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MessageConsumerPayload } from './dtos/message-consumer-payload.dto';
import { VkService } from 'src/vk/vk.service';
import { TargetStatusEnum } from 'src/target/enums/target-status.enum';

@Injectable()
export class MessagesService {
  constructor(
    @InjectQueue('messages-queue')
    private readonly messagesQueue: Queue,
    private readonly targetService: TargetService,
    private readonly accountService: AccountService,
    private readonly vkService: VkService,
  ) {}

  async create(
    user: UserEntity,
    { text, accountId, state, delay = 10 }: CreateMessageDto,
  ) {
    const account = await this.accountService.findById(user, accountId);
    const targets = await this.targetService.listAll(user, state);
    targets.forEach(async (target, index) => {
      const payload: MessageConsumerPayload = {
        user,
        account,
        target,
        text,
      };

      await this.messagesQueue.add(payload, {
        delay: delay * 1000 * index,
      });
    });
  }

  async send({ user, account, target, text }: MessageConsumerPayload) {
    try {
      await this.vkService.sendToUser(account, target, text);
      await this.targetService.changeStatus(
        user,
        target,
        TargetStatusEnum.SENT,
      );
    } catch (error) {
      await this.targetService.changeStatus(
        user,
        target,
        TargetStatusEnum.BLOCKED,
      );
    }
  }
}
