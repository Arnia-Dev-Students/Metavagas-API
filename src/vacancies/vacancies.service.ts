import { 
  HttpException,
  Injectable, } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from 'src/database/entities/vacancy.entity';
import { Repository } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
    private companiesService: CompaniesService,
    private usersService: UsersService,
  ) {}

  async create(data: CreateVacancyDto, userId: number, companyId: number) {
    try {
      const company = await this.companiesService.getById(companyId);
      const user = await this.usersService.getById(userId);

      const newVacancy = this.vacanciesRepository.create(data);

      newVacancy.advertiser = user;
      newVacancy.company = company;

      const createdVacancy = await this.vacanciesRepository.save(newVacancy);

      return createdVacancy;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getVacancies() {
    try {
      const vacancies = await this.vacanciesRepository.find({ relations: ['company', 'advertiser', 'technologies'] });

      return vacancies;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return `This action returns all vacancies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacancy`;
  }

  update(id: number, updateVacancyDto: UpdateVacancyDto) {
    return `This action updates a #${id} vacancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacancy`;
  }
}
