import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { WorkflowEntity } from './workflow.entity';
import { TaskEntity } from './task.entity';

@Entity('stage')
export class StageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated: Date;

  @ManyToOne(type => WorkflowEntity, workflow => workflow.stages)
  workflow: WorkflowEntity;

  @OneToMany(type => TaskEntity, tasks => tasks.stage)
  tasks: TaskEntity[];
}