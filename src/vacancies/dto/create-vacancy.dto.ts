import {
  IsNumber,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVacancyDto {
  @ApiProperty({
    description: 'ID of the company',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    description: 'Role of the vacancy',
    example: 'Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  vacancyRole: string;

  @ApiProperty({
    description: 'Wage for the vacancy',
    example: 6000,
  })
  @IsNumber()
  @IsNotEmpty()
  wage: number;

  @ApiProperty({
    description: 'Location of the vacancy',
    example: 'Goiânia',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Type of the vacancy',
    example: 'CLT',
  })
  @IsString()
  @IsNotEmpty()
  vacancyType: string;

  @ApiProperty({
    description: 'Description of the vacancy',
    example: 'Looking for a software engineer with experience in NestJs.',
  })
  @IsString()
  @IsNotEmpty()
  vacancyDescription: string;

  @ApiProperty({
    description: 'Experience level required for the vacancy',
    example: 'Junior',
  })
  @IsString()
  @IsNotEmpty()
  level: string;
}
