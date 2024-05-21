import { PartialType } from '@nestjs/swagger';
import { CreateTechnologyDocs } from './create-technology.docs';


export class UpdateTechnologyDocs extends PartialType(CreateTechnologyDocs) {}
