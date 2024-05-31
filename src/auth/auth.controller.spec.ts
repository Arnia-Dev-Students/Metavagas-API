import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUserDto } from '../decorators/dto/current-user.dto';
import { UserDocs } from '../database/docs/user.docs';
import { LoginResponseDocs } from './docs/login-response.docs';
import { UserRoleEnum } from '../enums/user-role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      registerUser: jest.fn().mockResolvedValue(UserDocs),
      login: jest.fn().mockResolvedValue(LoginResponseDocs),
      me: jest.fn().mockResolvedValue(UserDocs),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        name: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
        role: UserRoleEnum.ADMIN,
      };
      const result = await controller.registerUser(registerDto);
      expect(result).toEqual(UserDocs);
      expect(service.registerUser).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto: LoginDto = {
        email: 'testuser@example.com',
        password: 'password',
      };
      const result = await controller.login(loginDto);
      expect(result).toEqual(LoginResponseDocs);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('me', () => {
    const currentUser: CurrentUserDto = {
      user: 1,
      email: 'testuser@example.com',
      role: UserRoleEnum.ADMIN,
    };

    it('should return the logged user info', async () => {
      const result = await controller.me(currentUser);
      expect(result).toEqual(UserDocs);
      expect(service.me).toHaveBeenCalledWith(currentUser.user);
    });
  });
});
