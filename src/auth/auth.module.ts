import { Module } from '@nestjs/common';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';
import { HttpAuthGuard } from './http-auth.guard';
import { AuthController } from './auth.controller';
import { WsAuthGuard } from './ws-auth.guard';

@Module({
  imports: [EncryptionModule, TokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware, HttpAuthGuard, WsAuthGuard],
  exports: [AuthService, AuthMiddleware, HttpAuthGuard, WsAuthGuard],
})
export class AuthModule {}
