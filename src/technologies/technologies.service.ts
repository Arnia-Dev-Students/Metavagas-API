import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { Technology } from '../database/entities/technology.entity';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { EXCEPTION_MESSAGE } from 'src/enums/exception-message';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message copy';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private technologiesRepository: Repository<Technology>,
  ) {}

  async create(data: CreateTechnologyDto) {
    try {
      if (await this.technologiesExistsBy(data.tecName)) {
        throw new BadRequestException(
          EXCEPTION_MESSAGE.TECHNOLOGY_NAME_EXISTS
        );
      }

      const newTechnology = this.technologiesRepository.create(data);

      await this.technologiesRepository.save(newTechnology);

      return newTechnology;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async technologiesExistsBy(tecName: string) {
    try {
      return await this.technologiesRepository.exists({ where: { tecName } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAll(): Promise<Technology[]> {
    try {
      const technologies = await this.technologiesRepository.find();
      return technologies;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(EXCEPTION_MESSAGE.FAILED_GET_TECHNOLOGIES);
    }
  }

  async getById(id: number) {
    try {
      return await this.technologiesRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, data: UpdateTechnologyDto) {
    try {
      const technologiesToUpdate = await this.getById(id);

      if (data.tecName && data.tecName !== technologiesToUpdate.tecName) {
        const nameAlreadyExists = await this.technologiesExistsBy(data.tecName);
        if (nameAlreadyExists) {
          throw new BadRequestException(
            EXCEPTION_MESSAGE.TECHNOLOGY_NAME_EXISTS,
          );
        }
      }

      await this.technologiesRepository.update(id, data);

      return await this.getById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.getById(id);

      await this.technologiesRepository.delete(id);

      return { response: SUCCESSFUL_MESSAGE.DELETE_TECHNOLOGY };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
