import { TargetStatusEnum } from '../enums/target-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TargetDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  group_id: string;

  @ApiProperty()
  gr_name: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  action: string;

  @ApiProperty()
  stud_name: string;

  @ApiProperty()
  st_vk_id: number;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  sale_id: number;

  @ApiProperty()
  discip_name: string;

  @ApiProperty()
  stud_id: number;

  @ApiProperty()
  sale_type_id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({
    enum: [
      TargetStatusEnum.SENT,
      TargetStatusEnum.PENDING,
      TargetStatusEnum.BLOCKED,
    ],
  })
  state: TargetStatusEnum;

  @ApiProperty()
  createdAt: Date;
}
