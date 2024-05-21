import { ApiProperty } from '@nestjs/swagger';

export class DeleteVacancyResponseDocs {
  @ApiProperty({ example: "Vacancy deleted with success." })
  response: string;
}
