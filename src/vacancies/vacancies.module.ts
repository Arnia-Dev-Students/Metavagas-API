import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancy.entity';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy]), UsersModule, CompaniesModule],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule {}
