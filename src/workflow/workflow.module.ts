import { WorkflowService } from './workflow.service';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageEntity } from 'src/entities/stage.entity';
import { WorkflowEntity } from 'src/entities/workflow.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([StageEntity,WorkflowEntity]),UserModule],
  providers: [WorkflowService],
  controllers: [WorkflowController],
  exports: [WorkflowService]
})

export class WorkflowModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(WorkflowController);
  }
}
