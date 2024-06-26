import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    CompaniesModule,
    TechnologiesModule,
    VacanciesModule,
  ],
})
export class AppModule {}
