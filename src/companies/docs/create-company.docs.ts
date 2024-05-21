import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDocs {
  @ApiProperty({
    description: 'The name of the company.',
    example: 'Oscorp',
  })
  name: string;

  @ApiProperty({
    description: 'The city where the company is located.',
    example: 'SP',
  })
  city: string;

  @ApiProperty({
    description: 'The state where the company is located.',
    example: 'São Paulo',
  })
  state: string;

  @ApiProperty({
    description: 'The address of the company.',
    example: 'Av. America',
  })
  address: string;

  @ApiProperty({
    description: 'The date the company was founded.',
    example: '2024-01-15',
  })
  foundedAt: string;

  @ApiProperty({
    description: 'Description of the company.',
    example: 'A tech solutions for small business.',
  })
  description: string;
}
