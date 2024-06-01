import { technologiesMock } from '../testing/technologies.test/technologies.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesService } from './technologies.service';

describe('TechnologiesService', () => {
  let service: TechnologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TechnologiesService,
          useValue: {
            create: jest.fn().mockResolvedValue(technologiesMock),
            getAll: jest.fn().mockResolvedValue([technologiesMock]),
            technologiesExistsBy: jest.fn().mockResolvedValue(true),
            getById: jest.fn().mockResolvedValue(technologiesMock),
            update: jest.fn().mockResolvedValue(technologiesMock),
            delete: jest.fn().mockResolvedValue({
              response: 'technologies deleted with success.',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TechnologiesService>(TechnologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of technologies', async () => {
      const technologies = await service.getAll();
      expect(technologies).toEqual([technologiesMock]);
    });
  });

  describe('getById', () => {
    it('should return a technology', async () => {
      const technology = await service.getById(1);
      expect(technology).toEqual(technologiesMock);
    });
  });

  describe('update', () => {
    it('should return an updated technology', async () => {
      const updatedTechnology = await service.update(1, technologiesMock);
      expect(updatedTechnology).toEqual(technologiesMock);
    });
  });

  describe('delete', () => {
    it('should return a success message', async () => {
      const deletedUserResponse = await service.delete(1);
      expect(deletedUserResponse).toEqual({
        response: 'technologies deleted with success.',
      });
    });
  });
});
