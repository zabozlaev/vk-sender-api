import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { HttpAuthGuard } from 'src/auth/http-auth.guard';
import { OkResponseDto } from 'src/common/dtos/ok-response.dto';
import { CreateTargetDto } from './dtos/create-target.dto';
import { TargetService } from './target.service';
import { ExpressRequest } from 'src/common/types/express-request';
import { TargetPaginationQueryDto } from './dtos/target-pagination-query.dto';
import { HttpAuthMongoRequiredGuard } from 'src/auth/http-auth-mongo-required.guard';

@UseGuards(HttpAuthGuard, HttpAuthMongoRequiredGuard)
@Controller('/targets')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Get('/')
  async list(
    @Query() query: TargetPaginationQueryDto,
    @Req() req: ExpressRequest,
  ) {
    return this.targetService.list(req.user, query);
  }

  @Post('/')
  async create(
    @Body() body: CreateTargetDto[],
    @Req() req: ExpressRequest,
  ): Promise<OkResponseDto> {
    await this.targetService.createMany(req.user, body);
    return { ok: true };
  }
}
