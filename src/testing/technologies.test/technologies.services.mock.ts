import { TechnologiesService } from '../../technologies/technologies.service';
import { technologiesMock } from './technologies.mock';

export const technologiesService = {
  provide: TechnologiesService,
  useValue: {
    create: jest.fn().mockRejectedValue(technologiesMock),
    getAll: jest.fn().mockRejectedValue(technologiesMock),
    technologiesExistsBy: jest.fn().mockRejectedValue(technologiesMock),
    getById: jest.fn().mockRejectedValue(technologiesMock),
    update: jest.fn().mockRejectedValue(technologiesMock),
    delete: jest.fn().mockRejectedValue(technologiesMock),
  },
};
