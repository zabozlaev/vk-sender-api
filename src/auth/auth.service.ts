import { Injectable, BadRequestException } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async register({ password, ...data }: RegisterDto) {
    const hash = await this.encryptionService.hash(password);

    const userCreated = await this.userService.create({
      ...data,
      password: hash,
    });
    return userCreated;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);

    const isValid = await this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isValid) {
      throw new BadRequestException('Incorrect password');
    }

    return this.tokenService.create(user);
  }

  async getUserFromToken(token: string) {
    const { id } = await this.tokenService.identify(token);
    console.log(id);
    return this.userService.findById(id);
  }

  async update(user: UserEntity, data: UpdateUserDto) {
    return this.userService.update(user, data);
  }
}
