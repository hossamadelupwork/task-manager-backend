import { PostStageDto } from './dto/post-stage.dto';
import { WorkflowService } from './workflow.service';
import { Controller, Post, Body, Param, UsePipes, Get } from '@nestjs/common';
import { WorkflowData } from './workflow.interface';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { PostWorkflowDto } from './dto/post-workflow.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('workflows')
@Controller('workflows')
export class WorkflowController {

    constructor(private readonly workflowService: WorkflowService) {}
    

    @Get()
    async get() {
        return await this.workflowService.findAll();
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() workflowData: PostWorkflowDto) {
        return await this.workflowService.create(workflowData);
    }

    @UsePipes(new ValidationPipe())
    @Post(':slug/stages')
    async createComment(@Param('slug') slug, @Body() stageData: PostStageDto) {
        return await this.workflowService.addStage(slug, stageData);
    }
}

