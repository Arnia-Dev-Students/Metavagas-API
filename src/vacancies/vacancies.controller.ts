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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADVERTISER)
  @Post()
  @ApiOperation({ summary: 'Create a new vacancy' })
  @ApiBody({ type: CreateVacancyDto })
  @ApiResponse({ })
  @ApiResponse({ })
  create(
    @Body() createVacancyDto: CreateVacancyDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const { companyId } = createVacancyDto;
    return this.vacanciesService.create(createVacancyDto, user.user, companyId);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all vacancies' })
  @ApiQuery({ name: 'technologyId', required: false, type: Number, description: 'Filter by technology ID' })
  @ApiQuery({ name: 'vacancyRole', required: false, type: String, description: 'Filter by vacancy role' })
  @ApiQuery({ name: 'wageMin', required: false, type: Number, description: 'Filter by minimum wage' })
  @ApiQuery({ name: 'wageMax', required: false, type: Number, description: 'Filter by maximum wage' })
  @ApiQuery({ name: 'vacancyType', required: false, type: String, description: 'Filter by vacancy type' })
  @ApiQuery({ name: 'location', required: false, type: String, description: 'Filter by location' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page', example: 10 })
  @ApiResponse({ })
  @ApiResponse({ })
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
  @ApiOperation({ summary: 'Get a vacancy by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the vacancy' })
  @ApiResponse({ })
  @ApiResponse({ })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.ADVERTISER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a vacancy by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the vacancy' })
  @ApiBody({ type: UpdateVacancyDto })
  @ApiResponse({ })
  @ApiResponse({ })
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
  @ApiOperation({ summary: 'Delete a vacancy by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the vacancy' })
  @ApiResponse({ })
  @ApiResponse({ })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.vacanciesService.delete(id, user.user, user.role);
  }

  @Get('public')
  @ApiOperation({ summary: 'Get public vacancies' })
  @ApiResponse({ })
  getPublicVacancies() {
    return this.vacanciesService.getPublicVacancies();
  }
}
