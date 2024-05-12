import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString() //Verificar a retorno do front para ver se muda para @IsDate()
  @IsNotEmpty()
  foundedAt: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
