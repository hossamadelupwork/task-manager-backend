import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { TaskEntity } from './task.entity';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated: Date;
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(type => TaskEntity, tasks => tasks.user)
  tasks: TaskEntity[];
}