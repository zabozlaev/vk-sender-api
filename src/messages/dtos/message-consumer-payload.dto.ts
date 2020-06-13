import { UserEntity } from 'src/user/user.entity';
import { AccountEntity } from 'src/accounts/account.entity';
import { TargetEntity } from 'src/target/target.entity';

export class MessageConsumerPayload {
  user: UserEntity;
  account: AccountEntity;
  target: TargetEntity;
  text: string;
}
