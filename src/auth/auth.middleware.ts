import {
  NestMiddleware,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from 'src/common/types/express-request';
import { AuthService } from './auth.service';
import { TOKEN_PREFIX } from './consts';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger('AuthMiddleware');

  constructor(private readonly authService: AuthService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization || req.cookies[TOKEN_PREFIX];

      if (token) {
        const user = await this.authService.getUserFromToken(token);
        req.user = user;
      }
    } catch (error) {
      res.cookie(TOKEN_PREFIX, '', {
        expires: new Date(),
      });
      console.log(error);
      this.logger.log(`Got invalid token for ${req.path}`);
      throw new UnprocessableEntityException(
        `Got invalid token for ${req.path}`,
      );
    }

    return next();
  }
}
