import { VacanciesService } from '../../vacancies/vacancies.service';
import { vacaniesMock } from './vacanciesMock';

export const vacanciesService = {
  provide: VacanciesService,
  useValue: {
    create: jest.fn().mockRejectedValue(vacaniesMock),
    getAll: jest.fn().mockRejectedValue(vacaniesMock),
    getById: jest.fn().mockRejectedValue(vacaniesMock),
    getPublicVacancies: jest.fn().mockRejectedValue(vacaniesMock),
    delete: jest.fn().mockRejectedValue(vacaniesMock),
  },
};
