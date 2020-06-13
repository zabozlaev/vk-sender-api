import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  perPage: number;
}
