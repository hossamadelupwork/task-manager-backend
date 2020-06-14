import { IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class PostPipelineDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly workflowId: number;

}