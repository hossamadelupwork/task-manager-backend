import { Injectable, HttpException, Req, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "src/entities/task.entity";
import { Repository } from "typeorm";
import { PipelineService } from "src/pipeline/pipeline.service";
import { TaskData } from "./task.interface";
import { WorkflowService } from "src/workflow/workflow.service";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(TaskEntity)
  private readonly taskRepository: Repository<TaskEntity>,
  private readonly pipelineService : PipelineService,
  private readonly workflowService : WorkflowService,
  @Inject(REQUEST) private readonly request: any){
  }

  async create(pipelineId:number ,taskData: TaskData ): Promise<TaskEntity> {
    
    const {pipeline,stage} = 
    await this.validatePipelineWithStage(pipelineId,taskData.stageId);

    let task = new (TaskEntity);
    task.name = taskData.name;
    task.description = taskData.description;
    task.pipeline = pipeline;
    task.stage = stage;
    task.user = this.request.user;

    const newTask = await this.taskRepository.save(task);

    return await this.taskRepository.findOne(newTask.id);

  }



  async edit(taskId:number ,taskData: TaskData ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(taskId,{
        relations: ['user','pipeline']
    });
    
    await this.validateTaskCreator(task);

    const {pipeline,stage} = 
    await this.validatePipelineWithStage(task.pipeline.id,taskData.stageId);

    task.description = taskData.description ;
    task.name =  taskData.name;
    task.stage = stage ;
    
    await this.taskRepository.update(taskId,task);

    return await this.taskRepository.findOne(taskId);

  }


  async delete(taskId:number ): Promise<boolean> {
    const task = await this.taskRepository.findOne(taskId,{
        relations: ['user','pipeline']
    });
    
    await this.validateTaskCreator(task);
    
    await this.taskRepository.delete(taskId)
    
    return true;
 
  }

    async getTaskDetails(taskId:number) : Promise<TaskEntity>{
        const task = await this.taskRepository.findOne(taskId,{
            relations: ['user','pipeline']
        });

        await this.validateTaskExistance(task);

        return task;
    }



  // tasks validations
  private async validatePipelineWithStage(pipelineId : number , stageId : number): Promise<{pipeline,stage}>{
    const pipeline = await this.pipelineService.findById(pipelineId);
    
    if(!pipeline)
        throw new HttpException({Pipeline:'not found'}, 404);

    const stage = pipeline.workflow.stages.find(stage => stage.id == stageId);
    if(!stage)
        throw new HttpException({Stage:'not found'}, 404);

    return {pipeline,stage};    
  }

  private async validateTaskCreator(task : TaskEntity){
    if(!task || task.user.id != this.request.user.id)
        throw new HttpException({Task:'not found'}, 404);
  }

  private async validateTaskExistance(task : TaskEntity){
    if(!task)
        throw new HttpException({Task:'not found'}, 404);
  }


}