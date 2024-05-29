import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { userMock } from '../testing/users.test/user.mock';
import { UsersService } from './users.service';
import { CurrentUserDto } from '../decorators/dto/current-user.dto';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UpdateUserDto } from './dto/update.user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const userServiceMock = {
      getAll: jest.fn().mockResolvedValue(userMock),
      delete: jest.fn().mockResolvedValue({ success: true }),
      getById: jest.fn().mockResolvedValue(userMock[0]),
      update: jest
        .fn()
        .mockResolvedValue({ ...userMock[0], ...{ name: 'Updated User' } }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of users', async () => {
      const userList = await controller.getAll();
      expect(userList).toEqual(userMock);
    });
  });

  describe('delete', () => {
    const currentUser: CurrentUserDto = {
      user: 1,
      email: 'lala@lala.com',
      role: UserRoleEnum.ADMIN,
    };

    it('should delete a user', async () => {
      const response = await controller.delete(1, currentUser);
      expect(response).toEqual({ success: true });
    });
  });

  describe('getById', () => {
    it('should return a user by ID', async () => {
      const user = await controller.getById(1);
      expect(user).toEqual(userMock[0]);
    });
  });

  describe('update', () => {
    const currentUser: CurrentUserDto = {
      user: 1,
      email: 'lala@lala.com',
      role: UserRoleEnum.ADMIN,
    };

    it('should update a user by ID', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      const updatedUser = await controller.update(
        1,
        updateUserDto,
        currentUser,
      );
      expect(updatedUser).toEqual({
        ...userMock[0],
        ...{ name: 'Updated User' },
      });
    });
  });
});
