import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Put,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { HttpAuthGuard } from './http-auth.guard';
import { ExpressRequest } from 'src/common/types/express-request';
import { OkResponseDto } from 'src/common/dtos/ok-response.dto';
import { Response } from 'express';
import { TOKEN_PREFIX } from './consts';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(HttpAuthGuard)
  @Get('/me')
  public me(@Req() req: ExpressRequest) {
    return req.user;
  }

  @UseGuards(HttpAuthGuard)
  @Put('/me')
  public async update(
    @Req() req: ExpressRequest,
    @Body() body: UpdateUserDto,
  ): Promise<OkResponseDto> {
    await this.authService.update(req.user, body);
    return { ok: true };
  }

  @Post('/login')
  public async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.authService.login(body);
    res.cookie(TOKEN_PREFIX, token, { httpOnly: true }).send({ token });
  }

  @Post('/register')
  public async register(@Body() body: RegisterDto): Promise<OkResponseDto> {
    await this.authService.register(body);
    return { ok: true };
  }
}
