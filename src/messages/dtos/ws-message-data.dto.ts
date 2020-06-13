import { UserEntity } from 'src/user/user.entity';

export abstract class WsMessageData {
  user: UserEntity;
}
