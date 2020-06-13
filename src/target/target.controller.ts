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
import { TargetPaginationResponseDto } from './dtos/target-pagination-response.dto';
import { ApiResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('targets')
@ApiCookieAuth()
@UseGuards(HttpAuthGuard)
@Controller('/targets')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @ApiResponse({
    type: TargetPaginationResponseDto,
  })
  @Get('/')
  async list(
    @Query() query: TargetPaginationQueryDto,
    @Req() req: ExpressRequest,
  ): Promise<TargetPaginationResponseDto> {
    return this.targetService.list(req.user, query);
  }

  @ApiResponse({
    type: OkResponseDto,
  })
  @Post('/')
  async create(
    @Body() body: CreateTargetDto[],
    @Req() req: ExpressRequest,
  ): Promise<OkResponseDto> {
    await this.targetService.createMany(req.user, body);
    return { ok: true };
  }
}
