import { CreateCompanyDocs } from './create-company.docs';
import { PartialType } from '@nestjs/swagger';

export class UpdateCompanyDocs extends PartialType(CreateCompanyDocs) {}
