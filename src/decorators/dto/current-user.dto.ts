import { UserRoleEnum } from "src/enums/user-role.enum";

export class CurrentUserDto {
  user: number;
  email: string;
  role: UserRoleEnum
}
