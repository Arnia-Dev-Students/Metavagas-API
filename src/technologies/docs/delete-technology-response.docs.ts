import { ApiProperty } from '@nestjs/swagger';

export class DeleteTechnologyResponseDocs {
  @ApiProperty({ example: "Technology deleted with success." })
  response: string;
}
