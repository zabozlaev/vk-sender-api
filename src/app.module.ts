import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountsModule } from './accounts/accounts.module';
import { EncryptionModule } from './encryption/encryption.module';
import { TargetModule } from './target/target.module';
import { MessagesModule } from './messages/messages.module';
import { TokenModule } from './token/token.module';
import { VkModule } from './vk/vk.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { UserEntity } from './user/user.entity';
import { AccountEntity } from './accounts/account.entity';
import { AuthMiddleware } from './auth/auth.middleware';
import { TargetEntity } from './target/target.entity';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'sender',
      username: 'zabozlaev',
      password: '123123',
      host: 'localhost',
      port: 5432,
      synchronize: true,
      entities: [UserEntity, AccountEntity, TargetEntity],
    }),
    CommonModule,
    AuthModule,
    UserModule,
    AccountsModule,
    EncryptionModule,
    TargetModule,
    MessagesModule,
    TokenModule,
    VkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
