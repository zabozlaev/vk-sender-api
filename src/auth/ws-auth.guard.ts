import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TOKEN_PREFIX } from './consts';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');
    const [, token] = cookies
      .find(cookie => cookie.startsWith(TOKEN_PREFIX))
      .split('=');

    const user: UserEntity = await this.authService.getUserFromToken(token);
    context.switchToWs().getData().user = user;
    return !!user;
  }
}
