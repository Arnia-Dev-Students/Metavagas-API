import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from 'src/database/entities/vacancy.entity';
import { Repository } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';
import { UserRoleEnum } from 'src/enums/user-role.enum';

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

  async update(
    id: number,
    data: UpdateVacancyDto,
    userId: number,
    userRole: UserRoleEnum,
  ) {
    try {
      const vacancy = await this.getById(id);

      if (userId !== vacancy.advertiser.id && userRole !== UserRoleEnum.ADMIN) {
        throw new ForbiddenException(
          'You are not allowed to update this vacancy.',
        );
      }

      Object.assign(vacancy, data);
      return this.vacanciesRepository.save(vacancy);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number, userId: number, userRole: UserRoleEnum) {
    try {
      const vacancy = await this.getById(id);

      if (userId !== vacancy.advertiser.id && userRole !== UserRoleEnum.ADMIN) {
        throw new ForbiddenException(
          'You are not allowed to delete this vacancy.',
        );
      }

      await this.vacanciesRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getById(id: number) {
    try {
      return this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.company', 'company')
        .leftJoinAndSelect('vacancy.advertiser', 'advertiser')
        .where('vacancy.id = :id', { id })
        .select([
          'vacancy',
          'company.name AS companyName',
          'advertiser.name AS advertiserName',
        ])
        .getOne();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAll(
    technologyId: number,
    vacancyRole: string,
    wageMin: number,
    wageMax: number,
    vacancyType: string,
    location: string,
    page: number,
    limit: number,
  ) {
    const queryBuilder = this.vacanciesRepository.createQueryBuilder('vacancy');

    if (technologyId) {
      queryBuilder.innerJoin(
        'vacancy.technologies',
        'technology',
        'technology.id = :technologyId',
        { technologyId },
      );
    }

    if (vacancyRole) {
      queryBuilder.andWhere('vacancy.vacancyRole = :vacancyRole', {
        vacancyRole,
      });
    }

    if (wageMin) {
      queryBuilder.andWhere('vacancy.wage >= :wageMin', { wageMin });
    }

    if (wageMax) {
      queryBuilder.andWhere('vacancy.wage <= :wageMax', { wageMax });
    }

    if (vacancyType) {
      queryBuilder.andWhere('vacancy.vacancyType = :vacancyType', {
        vacancyType,
      });
    }

    if (location) {
      queryBuilder.andWhere('vacancy.location = :location', { location });
    }

    const [vacancies, totalCount] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { vacancies, totalCount };
  }

  async getPublicVacancies() {
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.company', 'company')
        .leftJoinAndSelect('vacancy.advertiser', 'advertiser')
        .getMany();

      return vacancies;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
