import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { TargetStatusEnum } from '../enums/target-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TargetPaginationQueryDto extends PaginationQueryDto {
  @ApiProperty({ nullable: true })
  state?: TargetStatusEnum;
  @ApiProperty({ nullable: true })
  groupName?: string;
  @ApiProperty({ nullable: true })
  discip_name?: string;
}
