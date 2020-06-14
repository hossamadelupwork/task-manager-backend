import { Controller, Post, Get, Put, Delete, Body, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { TaskService } from './task.service';
import { PostTaskDto } from './dto/post-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('tasks')
@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @UsePipes(new ValidationPipe())
    @Post('pipelines/:slug/tasks')
    async create(@Param('slug') pipelineId , @Body() taskData: PostTaskDto) {
        return await this.taskService.create(pipelineId,taskData);
    }

    @Put('tasks/:slug')
    async edit(@Param('slug') taskId , @Body() taskData: PostTaskDto) {
        return await this.taskService.edit(taskId,taskData);
    }

    @Delete('tasks/:slug')
    async delete(@Param('slug') taskId) {
        return await this.taskService.delete(taskId);
    }

    @Get('tasks/:slug')
    async getTaskDetails(@Param('slug') taskId) {
        return await this.taskService.getTaskDetails(taskId);
    }

}
