import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowEntity } from "src/entities/workflow.entity";
import { Repository } from "typeorm";
import { WorkflowData } from "./workflow.interface";
import { StageEntity } from "src/entities/stage.entity";



@Injectable()
export class WorkflowService {
  constructor(@InjectRepository(WorkflowEntity)
  private readonly workflowRepository: Repository<WorkflowEntity>,
  @InjectRepository(StageEntity)
  private readonly stageRepository: Repository<StageEntity>){
  }

  async findAll(): Promise<WorkflowEntity[]> {
    return await this.workflowRepository.find();
  }

  async create(workflowData: WorkflowData): Promise<WorkflowEntity> {

    let workflow = new (WorkflowEntity);
    workflow.name = workflowData.name;

    const newWorlflow = await this.workflowRepository.save(workflow);

    return newWorlflow;

  }

  async addStage(slug: string, stageData): Promise<WorkflowEntity> {
    let workflow = await this.workflowRepository.findOne(slug);

    const stage = new StageEntity();
    stage.name = stageData.name;

    workflow.stages.push(stage);

    await this.stageRepository.save(stage);
    workflow = await this.workflowRepository.save(workflow);

    return workflow ;
  }

  async findById(id: number): Promise<WorkflowEntity> {
    const workflow = await this.workflowRepository.findOne(id);
    return workflow;
  }
}