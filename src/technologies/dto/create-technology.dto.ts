import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologiesDto {
  @IsString()
  @IsNotEmpty()
  tecName: string;

  @IsString()
  @IsNotEmpty()
  creatorsName: string;

  @IsDate()
  createdA: Date;

  @IsDate()
  updateAt: Date;

  @IsDate()
  deleteAt: Date;
}
