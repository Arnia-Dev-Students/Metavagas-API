import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { companiesMock } from '../testing/companies.test/companies.mock';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn().mockResolvedValue(companiesMock),
            getAll: jest.fn().mockResolvedValue([companiesMock]),
            companyExistsBy: jest.fn().mockResolvedValue(true),
            getById: jest.fn().mockResolvedValue(companiesMock),
            update: jest.fn().mockResolvedValue(companiesMock),
            delete: jest.fn().mockResolvedValue({
              response: 'company deleted with success.',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a technology', async () => {
      const Company = await service.getById(1);
      expect(Company).toEqual(companiesMock);
    });
  });

  describe('update', () => {
    it('should return an updated technology', async () => {
      const updatedCompany = await service.update(1, companiesMock);
      expect(updatedCompany).toEqual(companiesMock);
    });
  });

  describe('delete', () => {
    it('should return a success message', async () => {
      const deletedUserResponse = await service.delete(1);
      expect(deletedUserResponse).toEqual({
        response: 'company deleted with success.',
      });
    });
  });
});
