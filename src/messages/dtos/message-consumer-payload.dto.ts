import { UserEntity } from 'src/user/user.entity';
import { Target } from 'src/target/schemas/target.schema';
import { AccountEntity } from 'src/accounts/account.entity';

export class MessageConsumerPayload {
  user: UserEntity;
  account: AccountEntity;
  target: Target;
  text: string;
}
