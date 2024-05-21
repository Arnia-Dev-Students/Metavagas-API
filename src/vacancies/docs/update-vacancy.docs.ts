import { PartialType } from '@nestjs/swagger';
import { CreateVacancyDocs } from './create-vacancy.docs';

export class UpdateVacancyDocs extends PartialType(CreateVacancyDocs) {}
