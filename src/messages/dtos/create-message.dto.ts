import { TargetStatusEnum } from 'src/target/enums/target-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  text: string;
  @ApiProperty()
  accountId: number;
  @ApiProperty({ nullable: true })
  state?: TargetStatusEnum;
  @ApiProperty({ nullable: true })
  delay?: number;
}
