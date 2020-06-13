import { Injectable, Logger } from '@nestjs/common';
import { CreateTargetDto } from './dtos/create-target.dto';
import { UserEntity } from 'src/user/user.entity';
import { TargetPaginationQueryDto } from './dtos/target-pagination-query.dto';
import { TargetStatusEnum } from './enums/target-status.enum';
import { TargetPaginationResponseDto } from './dtos/target-pagination-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TargetEntity } from './target.entity';
import { Repository, FindConditions } from 'typeorm';

@Injectable()
export class TargetService {
  private readonly logger = new Logger('TargetService');

  constructor(
    @InjectRepository(TargetEntity)
    private readonly targetRepo: Repository<TargetEntity>,
  ) {}

  async createMany(user: UserEntity, data: CreateTargetDto[]): Promise<void> {
    const entities = data.map(x =>
      this.targetRepo.create({
        ...x,
        user,
      }),
    );

    const query = this.targetRepo
      .createQueryBuilder()
      .insert()
      .into(TargetEntity)
      .values(entities)
      .onConflict('DO NOTHING');

    await query.execute();
  }

  async list(
    user: UserEntity,
    { page, perPage, state, groupName, discip_name }: TargetPaginationQueryDto,
  ): Promise<TargetPaginationResponseDto> {
    const where: FindConditions<TargetEntity> = {};
    where.user = user;

    if (state) {
      where.state = state;
    }
    if (groupName) {
      where.gr_name = groupName;
    }
    if (discip_name) {
      where.discip_name = discip_name;
    }
    const items = await this.targetRepo.find({
      where,
      order: {
        createdAt: 'DESC',
      },

      skip: +page * +perPage,
      take: +perPage,
    });
    const total = await this.targetRepo.count(where);
    return { items, total };
  }

  async listAll(
    user: UserEntity,
    state?: TargetStatusEnum,
  ): Promise<TargetEntity[]> {
    const where: FindConditions<TargetEntity> = {};
    where.user = user;

    if (state) {
      where.state = state;
    }

    const items = await this.targetRepo.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });

    return items;
  }

  async changeStatus(
    _: UserEntity,
    target: TargetEntity,
    state: TargetStatusEnum,
  ): Promise<void> {
    target.state = state;
    await this.targetRepo.save(target);
  }
}
