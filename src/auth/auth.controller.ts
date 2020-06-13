import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { HttpAuthGuard } from './http-auth.guard';
import { ExpressRequest } from 'src/common/types/express-request';
import { OkResponseDto } from 'src/common/dtos/ok-response.dto';
import { Response } from 'express';
import { TOKEN_PREFIX } from './consts';
import { ApiResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { MeResponseDto } from './dtos/me-response.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: MeResponseDto,
  })
  @ApiCookieAuth()
  @UseGuards(HttpAuthGuard)
  @Get('/me')
  public me(@Req() req: ExpressRequest) {
    return new MeResponseDto(req.user);
  }

  @Post('/login')
  public async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.authService.login(body);
    res.cookie(TOKEN_PREFIX, token, { httpOnly: true }).send({ token });
  }

  @ApiResponse({
    type: OkResponseDto,
  })
  @Post('/register')
  public async register(@Body() body: RegisterDto): Promise<OkResponseDto> {
    await this.authService.register(body);
    return { ok: true };
  }
}
