import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TargetModule } from 'src/target/target.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { VkModule } from 'src/vk/vk.module';
import { MessagesConsumer } from './messages.consumer';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          name: 'messages-queue',
          redis: {
            host: config.get<string>('redis.host'),
            port: config.get<number>('redis.port'),
          },
        };
      },
      name: 'messages-queue',
    }),
    TargetModule,
    AccountsModule,
    VkModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesConsumer],
})
export class MessagesModule {}
