import { PaginationResponseDto } from 'src/common/dtos/pagination-response.dto';
import { TargetEntity } from '../target.entity';

export class TargetPaginationResponseDto extends PaginationResponseDto<
  TargetEntity[]
> {}
