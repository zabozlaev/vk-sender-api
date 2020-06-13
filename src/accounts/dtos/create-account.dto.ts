import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  authorize: boolean;
  @ApiProperty({ nullable: true })
  token?: string;
}
