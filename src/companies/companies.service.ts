import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { Company } from "../database/entities/company.entity";
import { Repository } from "typeorm";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(data: CreateCompanyDto) {
    try {
      if (await this.companyExistsBy(data.name)) {
        throw new BadRequestException(
          `An company with this name: ${data.name} already exists.`,
        );
      }
      const newCompany = this.companiesRepository.create(data);

      await this.companiesRepository.save(newCompany);

      return newCompany;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async companyExistsBy(name: string) {
    try {
      return await this.companiesRepository.exists({ where: { name } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getById(id: number) {
    try {
      return await this.companiesRepository.findOneOrFail({
        where: { id },
        relations: { vacancies: true },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAll(name?: string) {
    try {
      const companies = name
        ? await this.companiesRepository.find({ where: { name }, relations: ['vacancies'] })
        : await this.companiesRepository.find({ relations: ['vacancies'] });
      return companies;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Failed to fetch companies.');
    }
  }

  async update(id: number, data: UpdateCompanyDto) {
    try {
      const companyToUpdate = await this.getById(id);

      if (data.name && data.name !== companyToUpdate.name) {
        const nameAlreadyExists = await this.companyExistsBy(data.name);
        if (nameAlreadyExists) {
          throw new BadRequestException(
            `An company with this name: ${data.name} already exists.`,
          );
        }
      }
  
      await this.companiesRepository.update(id, data);
  
      await this.getById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.getById(id);

      await this.companiesRepository.softDelete(id);

      return { response: "Company deleted with success." };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
