import { PaginationResponseDto } from 'src/common/dtos/pagination-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TargetDto } from './target.dto';

export class TargetPaginationResponseDto extends PaginationResponseDto<
  TargetDto[]
> {
  @ApiProperty({ type: [TargetDto] })
  items: TargetDto[];
}
