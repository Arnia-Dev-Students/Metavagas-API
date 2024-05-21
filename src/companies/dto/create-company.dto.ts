import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Oscorp',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The city where the company is located',
    example: 'SP',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The state where the company is located',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'The address of the company',
    example: 'Av. America',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The date the company was founded',
    example: '2024-01-15',
  })
  @IsDateString()
  @IsNotEmpty()
  foundedAt: string;

  @ApiProperty({
    description: 'Description of the company',
    example: 'A tech solutions for small business.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
