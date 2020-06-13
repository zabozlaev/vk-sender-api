import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { TargetStatusEnum } from './enums/target-status.enum';

@Entity({ name: 'targets' })
@Unique('unique_idx', (t: TargetEntity) => [t.st_vk_id, t.user])
export class TargetEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  group_id: string;
  @Column()
  gr_name: string;
  @Column()
  date: Date;
  @Column()
  action: string;
  @Column()
  stud_name: string;
  @Column()
  st_vk_id: number;
  @Column({ nullable: true })
  comment: string;
  @Column({ nullable: true })
  sale_id: number;
  @Column()
  discip_name: string;
  @Column({ nullable: true })
  stud_id: number;
  @Column({ nullable: true })
  sale_type_id: number;
  @Column({ nullable: true })
  amount: number;
  @Column({ default: TargetStatusEnum.PENDING })
  state: TargetStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
