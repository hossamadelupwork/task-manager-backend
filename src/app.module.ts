import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { WorkflowModule } from './workflow/workflow.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    WorkflowModule,
    PipelineModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
