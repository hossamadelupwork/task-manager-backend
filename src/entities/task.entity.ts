import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { PipelineEntity } from './pipeline.entity';
import { StageEntity } from './stage.entity';
import { UserEntity } from './user.entity';

@Entity('task')
export class TaskEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated: Date;

  @ManyToOne(type => PipelineEntity, pipeline => pipeline.tasks)
  pipeline: PipelineEntity;

  @ManyToOne(type => StageEntity, stage => stage.tasks,{eager: true})
  @JoinColumn()
  stage: StageEntity;

  @ManyToOne(type => UserEntity, user => user.tasks)
  user: UserEntity;

  

}