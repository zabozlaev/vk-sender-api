import { TargetStatusEnum } from 'src/target/enums/target-status.enum';

export class CreateMessageDto {
  text: string;
  accountId: number;
  state?: TargetStatusEnum;
  delay?: number;
}
