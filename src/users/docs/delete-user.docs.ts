import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponseDocs {
  @ApiProperty({ example: "User deleted with success." })
  response: string;
}
