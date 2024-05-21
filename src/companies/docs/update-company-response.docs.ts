import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyResponseDocs {
  @ApiProperty({ example: 1, description: 'The id of the company.' })
  id: number;

  @ApiProperty({ example: 'Oscorp', description: 'The name of the company.' })
  name: string;

  @ApiProperty({
    example: 'Belo Horizonte',
    description: 'The city where the company is located.',
  })
  city: string;

  @ApiProperty({
    example: 'MG',
    description: 'The state where the company is located',
  })
  state: string;

  @ApiProperty({
    example: 'Av Afonso Pena, 245',
    description: 'The address of the company.',
  })
  address: string;

  @ApiProperty({
    example: '2022-02-16',
    description: 'The date the company was founded.',
  })
  foundedAt: Date;

  @ApiProperty({
    example: 'A tech solutions for small business.',
    description: 'Description of the company.',
  })
  description: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date when was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00.000Z',
    description: 'The date when was updated.',
  })
  updatedAt: Date;
}
