// import { Test, TestingModule } from '@nestjs/testing';
// import { VacanciesService } from '../vacancies/vacancies.service';
// import { vacaniesMock } from '../testing/vacanies.test/vacanies.mock';
// import { CreateVacancyDto } from './dto/create-vacancy.dto';

// describe('VacanciesService', () => {
//   let service: VacanciesService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         {
//           provide: VacanciesService,
//           useValue: {
//             create: jest.fn().mockRejectedValue(vacaniesMock),
//             getAll: jest.fn().mockRejectedValue(vacaniesMock),
//             getById: jest.fn().mockRejectedValue(vacaniesMock),
//             getPublicVacancies: jest.fn().mockRejectedValue(vacaniesMock),
//             delete: jest.fn().mockResolvedValue({
//               response: 'vacanies deleted with success.',
//             }),
//           },
//         },
//       ],
//     }).compile();
//     service = module.get<VacanciesService>(VacanciesService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () =>
//     it('should create a new vacancy', async () => {
//       // Arrange
//       const data: CreateVacancyDto = {
//         companyId: 1,
//         vacancyRole: 'Software Engineer',
//         wage: 75000,
//         location: 'New York',
//         vacancyType: 'Full-Time',
//         vacancyDescription:
//           'Responsible for developing and maintaining software applications.',
//         level: 'Mid',
//       };

//       // Act
//       const userId = 1;
//       const createdVacancy = await service.create(
//         data,
//         vacaniesMock.companyId,
//         userId,
//       );

//       // Assert
//       expect(createdVacancy).toEqual(vacaniesMock);
//     }));
// });

import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from '../vacancies/vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';
import { vacaniesMock } from '../testing/vacanies.test/vacanies.mock';

describe('VacanciesService', () => {
  let vagaService: VacanciesService;
  let companiesService: CompaniesService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        {
          provide: CompaniesService,
          useValue: {
            findById: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Example Company',
            }),
          },
        },
      ],
    }).compile();

    vagaService = module.get<VacanciesService>(VacanciesService);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(vagaService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vacancy associated with a company', async () => {
      // Arrange
      const companyId = 1; // ID da empresa
      const data: CreateVacancyDto = {
        companyId: companyId,
        vacancyRole: 'Software Engineer',
        wage: 75000,
        location: 'New York',
        vacancyType: 'Full-Time',
        vacancyDescription:
          'Responsible for developing and maintaining software applications.',
        level: 'Mid',
      };

      // Mock para o serviço de empresa
      jest.spyOn(companiesService, 'getById').mockResolvedValue(true as never);
      jest.spyOn(userService, 'getById').mockResolvedValue(true as never);

      // Act
      const userId = 1;
      const createdVacancy = await vagaService.create(data, companyId, userId);

      expect(createdVacancy).toEqual(vacaniesMock);
    });
  });
});
