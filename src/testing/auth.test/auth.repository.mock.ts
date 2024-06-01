import { HttpException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { userMock } from '../users.test/user.mock';

export const authRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    registerUser: jest.fn().mockResolvedValue(userMock),
    exists: jest.fn().mockReturnValue(true),
    getUserByEmail: jest.fn().mockResolvedValue(userMock),
    findEmail: jest.fn().mockResolvedValue(userMock),
    findOne: jest.fn().mockResolvedValue(userMock),
    login: jest.fn().mockResolvedValue(userMock),
    create: jest.fn().mockResolvedValue(userMock),
    save: jest.fn().mockResolvedValue(userMock),
    findOneOrFail: jest.fn().mockResolvedValue(userMock),
    me: jest.fn().mockImplementation(async (id: number) => {
      if (id === 1) {
        return userMock;
      } else {
        throw new HttpException('User not found', 404);
      }
    }),
  },
};
