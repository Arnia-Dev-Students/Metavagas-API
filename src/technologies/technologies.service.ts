import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnologiesDto } from './dto/create-technology.dto';
import { Technology } from '../database/entities/technology.entity';
import { UpdateTechnologiesDto } from './dto/update-technologies.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private technologiesRepository: Repository<Technology>,
  ) {}

  async create(data: CreateTechnologiesDto) {
    try {
      if (await this.technologiesExistsBy(data.tecName)) {
        throw new BadRequestException(
          `An technologies with this name: ${data.tecName} already exists.`,
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
      throw new NotFoundException('Failed to fetch technologies');
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

  async update(id: number, data: UpdateTechnologiesDto) {
    try {
      const technologiesToUpdate = await this.getById(id);

      if (data.tecName && data.tecName !== technologiesToUpdate.tecName) {
        const nameAlreadyExists = await this.technologiesExistsBy(data.tecName);
        if (nameAlreadyExists) {
          throw new BadRequestException(
            `An technologies with this name: ${data.tecName} already exists.`,
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

      return { response: 'Technologies deleted with success.' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
