import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from '../vacancies/vacancies.service';
import { vacanciesMock } from '../testing/vacancies.test/vacanciesMock';
import { UserRoleEnum } from '../enums/user-role.enum';

const allVacanciesMock = [vacanciesMock];

describe('VacanciesService', () => {
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VacanciesService,
          useValue: {
            create: jest.fn().mockResolvedValue(vacanciesMock),
            getAll: jest.fn().mockResolvedValue([vacanciesMock]),
            getById: jest.fn().mockResolvedValue(vacanciesMock),
            getPublicVacancies: jest.fn().mockResolvedValue(vacanciesMock),
            delete: jest.fn().mockResolvedValue({
              response: 'Vacancy deleted with success.',
            }),
            update: jest.fn().mockResolvedValue(vacanciesMock),
            findOne: jest.fn().mockResolvedValue(vacanciesMock),
            save: jest.fn().mockResolvedValue(vacanciesMock),
          },
        },
      ],
    }).compile();

    service = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vacancy', async () => {
      const userId = 1; 
      const companyId = 1; 
      const technologyIds = [1, 2]; 

      const createVacancyDto = {
        ...vacanciesMock,
        technologyIds,
      };

      const vacancy = await service.create(createVacancyDto, userId, companyId, technologyIds);
      expect(vacancy).toEqual(vacanciesMock);
    });
  });

  describe('update', () => {
    it('should return a updated vacancy', async () => {
      const updatedvacancy = await service.update(
        1,
        vacanciesMock,
        1,
        UserRoleEnum.ADMIN,
      );

      expect(updatedvacancy).toEqual(vacanciesMock);
    });
  });

  describe('delete', () => {
    it('sshould return a success message', async () => {
      const deletedVacancy = await service.delete(
        1,
        1,
        UserRoleEnum.ADMIN,
      );

      expect(deletedVacancy).toEqual({
        response: 'Vacancy deleted with success.',
      });
    });
  });

  describe('getById', () => {
    it('should return a vacancy', async () => {
      const vacancy = await service.getById(1);
      expect(vacancy).toEqual(vacanciesMock);
    });
  });

  describe('getAll', () => {
    it('should return a list of vacancies', async () => {
      const vacancies = await service.getAll();
      expect(vacancies).toEqual(allVacanciesMock);
    });
  });

});



