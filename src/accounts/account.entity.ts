import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  login: string;

  @Column()
  title: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  token?: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
