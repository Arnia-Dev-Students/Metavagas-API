import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  tecName: string;

  @IsString()
  @IsNotEmpty()
  creatorsName: string;
}

