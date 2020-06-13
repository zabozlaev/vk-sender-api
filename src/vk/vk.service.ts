import { Injectable } from '@nestjs/common';
import { VK } from 'vk-io';
import { Authorization } from '@vk-io/authorization';

import { AuthorizeDto } from './dtos/authorize.dto';
import { AccountEntity } from 'src/accounts/account.entity';
import { TargetEntity } from 'src/target/target.entity';

@Injectable()
export class VkService {
  private readonly authScope = ['message'];

  public async authorize(data: AuthorizeDto): Promise<string> {
    const vk = new VK({
      ...data,
      authScope: this.authScope,
    });

    const auth = new Authorization(vk).androidApp();

    const { token } = await auth.run();

    return token;
  }

  public async sendToUser(
    account: AccountEntity,
    target: TargetEntity,
    text: string,
  ) {
    const { token } = account;
    const vk = new VK({
      token,
      authScope: this.authScope,
    });

    await vk.api.messages.send({
      user_id: target.st_vk_id,
      message: text,
    });
  }
}
