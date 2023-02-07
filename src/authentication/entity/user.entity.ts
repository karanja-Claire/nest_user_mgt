import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/role.decorator';

export enum STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;
  @Exclude()
  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column()
  phone_no: string;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.INACTIVE })
  status: STATUS;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ unique: true, nullable: true })
  role_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
