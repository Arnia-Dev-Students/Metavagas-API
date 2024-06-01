import { CompaniesService } from '../../companies/companies.service';
import { companiesMock } from './companies.mock';

export const companiesService = {
  provide: CompaniesService,
  useValue: {
    create: jest.fn().mockRejectedValue(companiesMock),
    getAll: jest.fn().mockRejectedValue(companiesMock),
    companyExistsBy: jest.fn().mockRejectedValue(companiesMock),
    getById: jest.fn().mockRejectedValue(companiesMock),
    update: jest.fn().mockRejectedValue(companiesMock),
    delete: jest.fn().mockRejectedValue(companiesMock),
  },
};
