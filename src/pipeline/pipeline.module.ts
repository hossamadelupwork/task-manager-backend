import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PipelineController } from './pipeline.controller';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineEntity } from 'src/entities/pipeline.entity';
import { UserModule } from 'src/user/user.module';
import { PipelineService } from './pipeline.service';
import { WorkflowModule } from 'src/workflow/workflow.module';

@Module({
  imports: [TypeOrmModule.forFeature([PipelineEntity]),UserModule,WorkflowModule],
  providers: [PipelineService],
  controllers: [PipelineController],
  exports: [PipelineService]
})
export class PipelineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PipelineController);
  }
}