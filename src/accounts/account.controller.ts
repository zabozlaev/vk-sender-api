import { Controller, UseGuards, Post, Body, Req, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { HttpAuthGuard } from 'src/auth/http-auth.guard';
import { CreateAccountDto } from './dtos/create-account.dto';
import { ExpressRequest } from 'src/common/types/express-request';
import { OkResponseDto } from 'src/common/dtos/ok-response.dto';

@UseGuards(HttpAuthGuard)
@Controller('/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/')
  async list(@Req() req: ExpressRequest) {
    return this.accountService.findForUser(req.user);
  }

  @Post('/')
  async create(
    @Body() body: CreateAccountDto,
    @Req() req: ExpressRequest,
  ): Promise<OkResponseDto> {
    await this.accountService.create(req.user, body);
    return { ok: true };
  }
}
