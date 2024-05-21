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
        throw new NotFoundException(`${id} not found.`);
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
          'You are not allowed to update this user.',
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
          'You are not allowed to delete this user.',
        );
      }

      await this.usersRepository.softDelete(id);

      return { response: 'User deleted with success.' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
