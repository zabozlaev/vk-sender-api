import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Repository } from 'typeorm';
import { VkService } from 'src/vk/vk.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>,
    private readonly vkService: VkService,
  ) {}

  async create(
    user: UserEntity,
    { authorize, token, ...data }: CreateAccountDto,
  ) {
    if (authorize) {
      token = await this.vkService.authorize(data);
    }
    const account = await this.accountRepo.create({
      ...data,
      token,
      user,
    });

    return this.accountRepo.save(account);
  }

  async findForUser(user: UserEntity): Promise<AccountEntity[]> {
    return this.accountRepo.find({
      where: {
        user,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findById(user: UserEntity, id: number): Promise<AccountEntity> {
    const account = await this.accountRepo.findOne({
      where: {
        id,
        user,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }
}
