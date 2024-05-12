import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerPayload: RegisterDto) {
    try {
      const userEmail = await this.findEmail(registerPayload.email);

      if (userEmail) {
        throw new BadRequestException('email already registered.');
      }
      const createUser = this.userRepository.create(registerPayload);

      await this.userRepository.save(createUser);

      return createUser;
    } catch (e) {
      throw new HttpException(e.message, e?.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findEmail(email: string) {
    try {
      return await this.userRepository.exists({ where: { email } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: {
          email: true,
          id: true,
          password: true,
          role: true,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.getUserByEmail(loginDto.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const compare = await bcrypt.compare(loginDto.password, user.password);

      if (!compare) {
        throw new UnauthorizedException('Email or password wrong');
      }

      const payload = {
        email: user.email,
        user: user.id,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        token,
      };
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
