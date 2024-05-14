import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnologiesDto } from './dto/create-technology.dto';
import { Tecnology } from 'src/database/entities/tecnology.entity';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Tecnology)
    private technologiesRepository: Repository<Technologies>,
  ) {}

  async create(data: CreateTechnologiesDto) {
    try{
        if( await this.technologiesExistsBy(data.tecNme)) {
            throw new BadRequestException(
                `An technologies with this name: ${data.tecNme} already exists.`
            }
            const newTechnology = this.technologiesRepository.create(data);
      
            await this.technologiesRepository.save(newTechnology);
      
            return newTechnology;
          } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status);
          }
        }
}
