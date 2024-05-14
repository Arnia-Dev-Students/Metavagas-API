import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologiesDto {
  @IsString()
  @IsNotEmpty()
  tecNme: string;
  creatorsName: string;
}
