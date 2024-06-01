import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserRoleEnum } from '../enums/user-role.enum';
import { userMock } from '../testing/users.test/user.mock';

const usersMock = [userMock];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userMock),
            update: jest.fn().mockResolvedValue(userMock),
            find: jest.fn().mockResolvedValue(usersMock),
            findOneOrFail: jest.fn().mockResolvedValue(userMock),
            softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of users', async () => {
      const users = await service.getAll();
      expect(users).toEqual(usersMock);
    });
  });

  describe('getById', () => {
    it('should return a user', async () => {
      const user = await service.getById(1);
      expect(user).toEqual(userMock);
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      const updatedUser = await service.update(
        1,
        userMock,
        1,
        UserRoleEnum.ADMIN,
      );

      expect(updatedUser).toEqual(userMock);
    });
  });

  describe('delete', () => {
    it('should return a success message', async () => {
      const deletedUserResponse = await service.delete(
        1,
        1,
        UserRoleEnum.ADMIN,
      );

      expect(deletedUserResponse).toEqual({
        response: 'User deleted with success.',
      });
    });
  });
});
