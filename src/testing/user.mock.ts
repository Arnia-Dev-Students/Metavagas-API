import { UserRoleEnum } from "../enums/user-role.enum";


export const userMock = {
  id: 1,
  name: 'user1',
  email: 'user1@email.com',
  password: '1234',
  role: UserRoleEnum.ADMIN,
};