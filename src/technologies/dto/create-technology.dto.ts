import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologiesDto {
  @ApiProperty({
    description: 'The name of the technology',
    example: 'React',
  })
  @IsString()
  @IsNotEmpty()
  tecName: string;

  @ApiProperty({
    description: 'The name of the creator of the technology',
    example: 'Charles',
  })
  @IsString()
  @IsNotEmpty()
  creatorsName: string;
}

