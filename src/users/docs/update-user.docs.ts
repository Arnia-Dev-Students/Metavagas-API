import { PartialType } from '@nestjs/swagger';
import { RegisterDocs } from '../../auth/docs/register.docs';

export class UpdateUserDocs extends PartialType(RegisterDocs) {}
