import { ApiProperty } from "@nestjs/swagger";
import { CompanyDocs } from "../../database/docs/company.docs";
import { TechnologyDocs } from "../../database/docs/technology.docs";
import { UserDocs } from "../../database/docs/user.docs";

class VacancyDocs {
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
    description: 'The date when the vacancy was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00.000Z',
    description: 'The date when the vacancy was updated.',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Related company' })
  company: CompanyDocs;

  @ApiProperty({ description: 'Related advertiser' })
  advertiser: UserDocs;

  @ApiProperty({ description: 'Related technologies' })
  technologies: TechnologyDocs[];
}

export class GetVacanciesResponseDocs {
  @ApiProperty({
    type: [VacancyDocs],
    description: 'List of vacancies',
  })
  vacancies: VacancyDocs[];

  @ApiProperty({
    example: 2,
    description: 'Current page for pagination',
  })
  page: number;

  @ApiProperty({
    example: 2,
    description: 'Max itens per page for pagination',
  })
  limit: number;

  @ApiProperty({
    example: 3,
    description: 'Total number of pages for pagination',
  })
  totalPage: number;

  @ApiProperty({
    example: 10,
    description: 'Total count of vacancies',
  })
  totalCount: number;
}
