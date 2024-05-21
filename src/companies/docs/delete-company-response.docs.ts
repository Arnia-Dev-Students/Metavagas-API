import { ApiProperty } from '@nestjs/swagger';

export class DeleteCompanyResponseDocs {
  @ApiProperty({ example: "Company deleted with success." })
  response: string;
}
