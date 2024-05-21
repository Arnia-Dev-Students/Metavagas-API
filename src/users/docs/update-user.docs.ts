import { PartialType } from "@nestjs/swagger";
import { RegisterDocs } from "src/auth/docs";


export class UpdateUserDocs extends PartialType(RegisterDocs) {}