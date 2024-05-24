import { RegisterDto } from '../../auth/dto/register.dto';
import { UserRoleEnum } from '../../enums/user-role.enum';

export const registerUserDtoMock: RegisterDto = {
  email: 'charles@test.com',
  name: 'test',
  password: 'testing',
  role: UserRoleEnum.ADMIN,
};
