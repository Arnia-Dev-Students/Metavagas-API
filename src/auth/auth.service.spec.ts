import { TestingModule, Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtServiceMock } from '../testing/auth.test/jwt.service.mock';
import { userMock } from '../testing/users.test/user.mock';
import { userServiceMock } from '../testing/users.test/user.service.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { loginDtoMock } from '../testing/auth.test/login.mock';
import { tokenMock } from '../testing/auth.test/token.mock';
import { registerUserDtoMock } from '../testing/auth.test/register.mock';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
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
            me: jest.fn().mockResolvedValue(userMock),
          },
        },
        jwtServiceMock,
        userServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should return a registered user', async () => {
      jest
        .spyOn(authService, 'findEmail')
        .mockResolvedValueOnce(false as never);
      // act
      const user = await authService.registerUser(registerUserDtoMock);

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('login', () => {
    it('Should return an auth token.', async () => {
      // arrange
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      // act
      const authToken = await authService.login(loginDtoMock);

      // assert
      expect(authToken).toHaveProperty('token');
      expect(typeof authToken.token).toBe('string');
      expect(authToken.token).toEqual(tokenMock);
    });
  });

  describe('me', () => {
    it('should return a user by ID', async () => {
      const user = userMock;
      const result = await authService.me(1);
      expect(result).toEqual(user);
    });

    it('should throw an exception if user is not found', async () => {
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValue(new Error('User not found'));

      await expect(authService.me(1)).rejects.toThrow(HttpException);
      await expect(authService.me(1)).rejects.toThrow('User not found');
    });
  });
});
