import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { connect, Mongoose, FilterQuery } from 'mongoose';
import { CreateTargetDto } from './dtos/create-target.dto';
import { UserEntity } from 'src/user/user.entity';
import { targetModel, Target } from './schemas/target.schema';
import { TargetPaginationQueryDto } from './dtos/target-pagination-query.dto';
import { TargetStatusEnum } from './enums/target-status.enum';
import { TargetPaginationResponseDto } from './dtos/target-pagination-response.dto';

@Injectable()
export class TargetService {
  private readonly logger = new Logger('TargetService');

  async createMany(user: UserEntity, data: CreateTargetDto[]): Promise<void> {
    if (!user.mongo) {
      throw new BadRequestException('You do not have mongodb');
    }

    const db = await this.connectToMongo(user.mongo);
    const model = targetModel(db);
    try {
      await model.create(data);
    } catch (error) {
      this.logger.warn(`Duplications found for user ${user.id} ${user.email}`);
    }
    await this.closeConnections(db);
  }

  async list(
    user: UserEntity,
    { page, perPage, state, groupName, discip_name }: TargetPaginationQueryDto,
  ): Promise<TargetPaginationResponseDto> {
    if (!user.mongo) {
      throw new BadRequestException('You do not have mongodb');
    }
    const db = await this.connectToMongo(user.mongo);
    const model = targetModel(db);

    const filter: FilterQuery<Target> = {};

    if (state) {
      filter.state = state;
    }

    if (groupName) {
      filter.gr_name = groupName;
    }

    if (discip_name) {
      filter.discip_name = discip_name;
    }

    const items = await model
      .find(filter)
      .sort('-createdAt')
      .skip(+page * +perPage)
      .limit(+perPage);

    const total = await model.count(filter);

    await this.closeConnections(db);

    return { items, total };
  }

  async listAll(user: UserEntity, state?: TargetStatusEnum): Promise<Target[]> {
    if (!user.mongo) {
      throw new BadRequestException('You do not have mongodb');
    }
    const db = await this.connectToMongo(user.mongo);
    const model = targetModel(db);

    const filter: FilterQuery<Target> = {};

    if (state) {
      filter.state = state;
    }

    const items = await model.find(filter).sort('-createdAt');

    await this.closeConnections(db);

    return items;
  }

  async changeStatus(
    user: UserEntity,
    target: Target,
    state: TargetStatusEnum,
  ): Promise<void> {
    if (!user.mongo) {
      throw new BadRequestException('You do not have mongodb');
    }

    const connection = await this.connectToMongo(user.mongo);

    const model = targetModel(connection);

    await model.updateOne(target, {
      state,
    });

    await this.closeConnections(connection);
  }

  async closeConnections(db: Mongoose): Promise<void> {
    return new Promise(resolve =>
      db.connections.forEach((c, idx) =>
        c.close(err => {
          if (err) {
            this.logger.error(`Connection closing error: ${err.message}`);
          }
          if (db.connections.length - 1 === idx) {
            resolve();
          }
        }),
      ),
    );
  }

  async connectToMongo(uri: string) {
    const conn = await connect(uri, {
      poolSize: 1,
      useNewUrlParser: true,
    });

    return conn;
  }
}
