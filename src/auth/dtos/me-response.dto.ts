import { ApiResponseProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';

export class MeResponseDto {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  email: string;

  constructor({ email, username, id }: UserEntity) {
    this.id = id;
    this.email = email;
    this.username = username;
  }
}
