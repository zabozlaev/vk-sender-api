import { TargetStatusEnum } from '../enums/target-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetDto {
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
  @ApiProperty({ nullable: true })
  comment: string;
  @ApiProperty({ nullable: true })
  sale_id: number;
  @ApiProperty()
  discip_name: string;
  @ApiProperty()
  stud_id: number;
  @ApiProperty({ nullable: true })
  sale_type_id: number;
  @ApiProperty({ nullable: true })
  amount: number;

  @ApiProperty({
    nullable: true,
    enum: [
      TargetStatusEnum.SENT,
      TargetStatusEnum.PENDING,
      TargetStatusEnum.BLOCKED,
    ],
  })
  state: TargetStatusEnum.PENDING = TargetStatusEnum.PENDING;
}
