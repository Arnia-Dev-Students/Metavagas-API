import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserDto } from '../decorators/dto/current-user.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADVERTISER)
  @Post()
  create(
    @Body() createVacancyDto: CreateVacancyDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const { companyId } = createVacancyDto;
    return this.vacanciesService.create(createVacancyDto, user.user, companyId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(
    @Query('technologyId') technologyId: number,
    @Query('vacancyRole') vacancyRole: string,
    @Query('wageMin') wageMin: number,
    @Query('wageMax') wageMax: number,
    @Query('vacancyType') vacancyType: string,
    @Query('location') location: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.vacanciesService.getAll(
      technologyId,
      vacancyRole,
      wageMin,
      wageMax,
      vacancyType,
      location,
      page,
      limit,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.ADVERTISER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.vacanciesService.update(
      id,
      updateVacancyDto,
      user.user,
      user.role,
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.ADVERTISER)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.vacanciesService.delete(id, user.user, user.role);
  }

  @Get('public')
  getPublicVacancies() {
    return this.vacanciesService.getPublicVacancies();
  }
}
