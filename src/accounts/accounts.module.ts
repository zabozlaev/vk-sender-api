import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { VkModule } from 'src/vk/vk.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), VkModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountsModule {}
