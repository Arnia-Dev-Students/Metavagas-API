import { Repository } from 'typeorm';
import {
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async me(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return user;
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  async getAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }


  async getById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`${id} not found.`);
      }

      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      await this.getById(id);

      await this.userRepository.update(id, data);

      return await this.getById(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
