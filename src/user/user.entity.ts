import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AccountEntity } from 'src/accounts/account.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  mongo?: string;

  @OneToMany(
    () => AccountEntity,
    a => a.user,
  )
  accounts: AccountEntity[];
}
