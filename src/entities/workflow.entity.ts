import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from 'typeorm';
import { StageEntity } from './stage.entity';
import { PipelineEntity } from './pipeline.entity';

@Entity('workflow')
export class WorkflowEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated: Date;

  @OneToMany(type => StageEntity, stages => stages.workflow, {eager: true})
  @JoinColumn()
  stages: StageEntity[];

  @OneToMany(type => PipelineEntity, pipelines => pipelines.workflow)
  pipelines: PipelineEntity[];
}