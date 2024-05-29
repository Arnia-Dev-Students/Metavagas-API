import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from '../vacancies/vacancies.service';
import { vacanciesMock } from '../testing/vacancies.test/vacanciesMock';

describe('VacanciesService', () => {
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VacanciesService,
          useValue: {
            create: jest.fn().mockRejectedValue(vacanciesMock),
            getAll: jest.fn().mockRejectedValue(vacanciesMock),
            getById: jest.fn().mockRejectedValue(vacanciesMock),
            getPublicVacancies: jest.fn().mockRejectedValue(vacanciesMock),
            delete: jest.fn().mockResolvedValue({
              response: 'vacanies deleted with success.',
            }),
          },
        },
      ],
    }).compile();
    service = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
