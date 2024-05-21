import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Paola',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: UserRoleEnum.CANDIDATE,
    required: false,
    enum: UserRoleEnum,
  })
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role: UserRoleEnum;
}
