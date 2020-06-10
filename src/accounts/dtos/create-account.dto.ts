export class CreateAccountDto {
  login: string;

  title: string;

  password: string;

  authorize: boolean;

  token?: string;
}
