import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologiesDto {
  @IsString()
  @IsNotEmpty()
  tecName: string;

  @IsString()
  @IsNotEmpty()
  creatorsName: string;
}
