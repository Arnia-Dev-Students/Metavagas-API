import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancy.entity';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';
import { UserRoleEnum } from '../enums/user-role.enum';
import { EXCEPTION_MESSAGE } from 'src/enums/exception-message.enum';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';
import { TechnologiesService } from 'src/technologies/technologies.service';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
    private technologiesService: TechnologiesService,
    private companiesService: CompaniesService,
    private usersService: UsersService,
  ) {}

  async create(data: CreateVacancyDto, userId: number, companyId: number, technologyIds?: number[]) {
    try {
      const company = await this.companiesService.getById(companyId);
      const user = await this.usersService.getById(userId);

      const technologies = await this.technologiesService.getById(technologyIds);
      if (Array.isArray(technologies) && technologies.length !== technologyIds.length) {
        throw new HttpException(EXCEPTION_MESSAGE.SOME_TECHNOLOGY_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const newVacancy = this.vacanciesRepository.create(data);
      newVacancy.advertiser = user;
      newVacancy.company = company;
      
      if(Array.isArray(technologies)) {
        newVacancy.technologies = technologies;
      }

      await this.vacanciesRepository.save(newVacancy);

      return newVacancy;
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
          EXCEPTION_MESSAGE.VACANCY_UPDATE_NOT_ALLOWED,
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
          EXCEPTION_MESSAGE.DELETE_VACANCY_NOT_ALLOWED,
        );
      }

      await this.vacanciesRepository.delete(id);

      return { response: SUCCESSFUL_MESSAGE.DELETE_VACANCY };
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
    technologyIds?: number[],
    vacancyRole?: string,
    wageMin?: number,
    wageMax?: number,
    vacancyTypes?: string[],
    location?: string,
    page: number = 1,
    limit: number = 8,
  ) {
    const queryBuilder = this.vacanciesRepository.createQueryBuilder('vacancy');
  
    if (technologyIds && technologyIds.length > 0) {
      queryBuilder.innerJoin(
        (qb) => qb
          .select('"vacancy_technology"."vacancyId"')
          .from('vacancy_technology', 'vacancy_technology')
          .where('"vacancy_technology"."technologyId" IN (:...technologyIds)', { technologyIds })
          .groupBy('"vacancy_technology"."vacancyId"')
          .having('COUNT(DISTINCT "vacancy_technology"."technologyId") = :technologyCount', { technologyCount: technologyIds.length }),
        'vacancy_tech_match',
        'vacancy.id = "vacancy_tech_match"."vacancyId"'
      );
    }
  
    if (vacancyRole) {
      queryBuilder.andWhere('vacancy.vacancyRole LIKE :vacancyRole', {
        vacancyRole: `%${vacancyRole}%`,
      });
    }
  
    if (wageMin) {
      queryBuilder.andWhere('vacancy.wage >= :wageMin', { wageMin });
    }
  
    if (wageMax) {
      queryBuilder.andWhere('vacancy.wage <= :wageMax', { wageMax });
    }
  
    if (vacancyTypes && vacancyTypes.length > 0) {
      queryBuilder.andWhere('vacancy.vacancyType IN (:...vacancyTypes)', {
        vacancyTypes,
      });
    }
  
    if (location) {
      queryBuilder.andWhere('vacancy.location LIKE :location', {
        location: `%${location}%`,
      });
    }
  
    const [vacancies, totalCount] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    const totalPage = Math.ceil(totalCount / limit);
  
    return { vacancies, totalCount, limit, totalPage, page };
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
