import { IsNotEmpty } from 'class-validator';

export class PostWorkflowDto {

  @IsNotEmpty()
  readonly name: string;
}