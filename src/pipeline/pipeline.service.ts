import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PipelineEntity } from "src/entities/pipeline.entity";
import { PipelineData } from "./pipeline.interface";
import { WorkflowService } from "src/workflow/workflow.service";

@Injectable()
export class PipelineService {
  constructor(@InjectRepository(PipelineEntity)
  private readonly pipelineRepository: Repository<PipelineEntity>,
  private readonly workflowService : WorkflowService){}


  async create(pipelineData: PipelineData): Promise<PipelineEntity> {
    let workflow = await this.workflowService.findById(pipelineData.workflowId);

    if(!workflow)
        throw new HttpException({Workflow:'not found'}, 404);

    let pipeline = new (PipelineEntity);
    pipeline.name = pipelineData.name;
    pipeline.workflow = workflow;

    const newPipeline = await this.pipelineRepository.save(pipeline);

    return newPipeline;

  }

  async findAll(): Promise<PipelineEntity[]> {
    return await this.pipelineRepository.find();
  }

  async findById(id: number): Promise<PipelineEntity> {
    let pipeline = await this.pipelineRepository.findOne(id,{
        relations: ['workflow','tasks']
    });
    
    return pipeline;
  }
}