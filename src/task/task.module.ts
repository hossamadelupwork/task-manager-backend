import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TaskController } from './task.controller';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { TaskService } from './task.service';
import { PipelineModule } from 'src/pipeline/pipeline.module';
import { WorkflowModule } from 'src/workflow/workflow.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]),UserModule,PipelineModule,WorkflowModule],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TaskController);
  }
}