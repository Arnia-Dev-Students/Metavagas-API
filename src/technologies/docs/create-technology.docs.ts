import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyDocs {
  @ApiProperty({
    description: 'The name of the technology',
    example: 'React',
  })
  tecName: string;

  @ApiProperty({
    description: 'The name of the creator of the technology',
    example: 'Charles',
  })
  creatorsName: string;
}
