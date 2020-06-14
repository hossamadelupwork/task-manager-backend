import { Controller, UsePipes, ValidationPipe, Post, Body, Get, Param } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { PostPipelineDto } from './dto/post-pipeline.dto';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('pipelines')
@Controller('pipelines')
export class PipelineController {

    constructor(private readonly pipelineService: PipelineService) {}
   
    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() pipelineData: PostPipelineDto) {
        return await this.pipelineService.create(pipelineData);
    }

    @Get()
    async getPipelines() {
        return await this.pipelineService.findAll();
    }

    @Get(':slug')
    async getPipelineDetails(@Param('slug') slug) {
        return await this.pipelineService.findById(slug);
    }
}
