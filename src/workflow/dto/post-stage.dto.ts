import { IsNotEmpty } from 'class-validator';

export class PostStageDto {

  @IsNotEmpty()
  readonly name: string;
}