import { PartialType } from '@nestjs/swagger';

import { CreateTechnologiesDto } from '../dto/create-technology.dto';

export class UpdateTechnologiesDto extends PartialType(CreateTechnologiesDto) {}
