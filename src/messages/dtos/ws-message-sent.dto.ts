import { TargetEntity } from 'src/target/target.entity';
import { TargetStatusEnum } from 'src/target/enums/target-status.enum';

export class WsMessageSent {
  target: TargetEntity;
  status: TargetStatusEnum;
  timestamp: Date;
}
