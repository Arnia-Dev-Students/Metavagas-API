import { IsNumber, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateVacancyDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsNotEmpty()
  vacancyRole: string;

  @IsNumber()
  @IsNotEmpty()
  wage: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  vacancyType: string;

  @IsString()
  @IsNotEmpty()
  vacancyDescription: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsArray()
  @IsOptional()
  technologyIds: number[];
}
