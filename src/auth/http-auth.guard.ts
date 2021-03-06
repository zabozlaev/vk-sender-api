import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { ExpressRequest } from 'src/common/types/express-request';

@Injectable()
export class HttpAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as ExpressRequest;
    return !!request.user;
  }
}
