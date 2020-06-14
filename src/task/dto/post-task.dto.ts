import { IsNotEmpty } from 'class-validator';

export class PostTaskDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly stageId: number;

}