import { ApiProperty } from "@nestjs/swagger";

export class CreateVacancyDocs {
  @ApiProperty({
    description: 'ID of the company.',
    example: 1,
  })
  companyId: number;

  @ApiProperty({
    description: 'Role of the vacancy.',
    example: 'Software Engineer',
  })
  vacancyRole: string;

  @ApiProperty({
    description: 'Wage for the vacancy.',
    example: 6000,
  })
  wage: number;

  @ApiProperty({
    description: 'Location of the vacancy.',
    example: 'Goiânia',
  })
  location: string;

  @ApiProperty({
    description: 'Type of the vacancy.',
    example: 'CLT',
  })
  vacancyType: string;

  @ApiProperty({
    description: 'Description of the vacancy',
    example: 'Looking for a software engineer with experience in NestJs.',
  })
  vacancyDescription: string;

  @ApiProperty({
    description: 'Experience level required for the vacancy.',
    example: 'Junior',
  })
  level: string;

   @ApiProperty({
    description: 'Ids from technologies to make relation.',
    example: [1, 3, 5],
  })
  technologyIds: number[];
}
