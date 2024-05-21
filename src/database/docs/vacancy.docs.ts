import { UserDocs } from './user.docs';
import { TechnologyDocs } from './technology.docs';
import { CompanyDocs } from './company.docs';
import { ApiProperty } from '@nestjs/swagger';

export class VacancyDocs {
  @ApiProperty({ example: 1, description: 'Id of the vacancy.' })
  id: number;

  @ApiProperty({
    example: 'Devops Analyst',
    description: 'Role of the vacancy.',
  })
  vacancyRole: string;

  @ApiProperty({ example: 6000, description: 'Wage for the vacancy' })
  wage: number;

  @ApiProperty({ example: 'Anápolis', description: 'Location of the vacancy' })
  location: string;

  @ApiProperty({ example: 'PJ', description: 'Type of the vacancy' })
  vacancyType: string;

  @ApiProperty({
    example: 'Looking for a devops with experience.',
    description: 'Description of the vacancy',
  })
  vacancyDescription: string;

  @ApiProperty({
    example: 'Pleno',
    description: 'Experience level required for the vacancy',
  })
  level: string;

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

  @ApiProperty({
    type: () => UserDocs,
    description: 'User associated with the vacancy.',
  })
  advertiser: UserDocs;

  @ApiProperty({
    type: () => CompanyDocs,
    description: 'Company associated with the vacancy',
  })
  company: CompanyDocs;

  @ApiProperty({
    type: () => TechnologyDocs,
    isArray: true,
    description: 'List of technologies associated with the vacancy.',
  })
  technologies: TechnologyDocs[];
}
