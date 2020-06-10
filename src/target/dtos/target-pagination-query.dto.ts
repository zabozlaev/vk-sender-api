import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { TargetStatusEnum } from '../enums/target-status.enum';

export class TargetPaginationQueryDto extends PaginationQueryDto {
  state?: TargetStatusEnum;
  groupName?: string;
  discip_name?: string;
}
