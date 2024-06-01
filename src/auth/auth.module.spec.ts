import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({}), // manter vazio para não conectar ao banco
        TypeOrmModule.forFeature([User]),
        UsersModule,
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
  });

  it('should be defined', () => {
    const controller = module.get<UsersController>(UsersController);
    const service = module.get<UsersService>(UsersService);
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
