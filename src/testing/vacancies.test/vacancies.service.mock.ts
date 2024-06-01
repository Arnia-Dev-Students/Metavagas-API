import { VacanciesService } from '../../vacancies/vacancies.service';
import { vacanciesMock } from './vacanciesMock';

export const vacanciesService = {
  provide: VacanciesService,
  useValue: {
    create: jest.fn().mockRejectedValue(vacanciesMock),
    getAll: jest.fn().mockRejectedValue(vacanciesMock),
    getById: jest.fn().mockRejectedValue(vacanciesMock),
    getPublicVacancies: jest.fn().mockRejectedValue(vacanciesMock),
    delete: jest.fn().mockRejectedValue(vacanciesMock),
  },
};
