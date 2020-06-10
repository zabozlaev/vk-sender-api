import { PaginationResponseDto } from 'src/common/dtos/pagination-response.dto';
import { Target } from '../schemas/target.schema';

export class TargetPaginationResponseDto extends PaginationResponseDto<
  Target[]
> {}
