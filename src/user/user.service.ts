import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { mongo } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create({ email, username, password }: CreateUserDto) {
    const found = await this.userRepo.findOne({
      where: [
        {
          email,
        },
        {
          username,
        },
      ],
    });

    if (found) {
      throw new BadRequestException('Try another username or email');
    }

    const user = this.userRepo.create({
      email,
      username,
      password,
    });

    return this.userRepo.save(user);
  }

  async findById(id: number) {
    return this.userRepo.findOne(id);
  }

  async findByEmail(email: string) {
    const found = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!found) {
      throw new BadRequestException('Try another username or email');
    }

    return found;
  }

  async update(user: UserEntity, data: UpdateUserDto) {
    try {
      const conn = await mongo.connect(data.mongo, {
        poolSize: 1,
      });
      await conn.close(true);
    } catch (error) {
      throw new NotFoundException('No such database');
    }

    return this.userRepo.update(user, data);
  }
}
