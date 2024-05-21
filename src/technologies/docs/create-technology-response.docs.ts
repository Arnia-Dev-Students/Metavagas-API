import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyResponseDocs {
  @ApiProperty({ example: 1, description: 'The id of the technology.' })
  id: number;

  @ApiProperty({ example: 'NestJs', description: 'The name of the technology.' })
  tecName: string;

  @ApiProperty({ example: 'Marco', description: 'The name of the creator of the technology' })
  creatorsName: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'The date when was created.' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'The date when was updated.' })
  updatedAt: Date;
}
