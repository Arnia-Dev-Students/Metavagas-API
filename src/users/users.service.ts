import { Repository } from 'typeorm';
import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserRoleEnum } from '../enums/user-role.enum';
import { EXCEPTION_MESSAGE } from '../enums/exception-message.enum';
import { SUCCESSFUL_MESSAGE } from '../enums/successful-message.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getById(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    data: UpdateUserDto,
    userId: number,
    userRole: UserRoleEnum,
  ) {
    try {
      const user = await this.getById(id);

      if (userId !== user.id && userRole !== UserRoleEnum.ADMIN) {
        throw new ForbiddenException(
          EXCEPTION_MESSAGE.USER_UPDATE_NOT_ALLOWED,
        );
      }

      await this.usersRepository.update(id, data);

      return await this.getById(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number, userId: number, userRole: UserRoleEnum) {
    try {
      const user = await this.getById(id);

      if (userId !== user.id && userRole !== UserRoleEnum.ADMIN) {
        throw new ForbiddenException(
          EXCEPTION_MESSAGE.DELETE_USER_NOT_ALLOWED,
        );
      }

      await this.usersRepository.softDelete(id);

      return { response: SUCCESSFUL_MESSAGE.DELETE_USER };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
