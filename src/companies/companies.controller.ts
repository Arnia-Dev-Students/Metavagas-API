import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateCompanyDocs,
  CreateCompanyResponseDocs,
  UpdateCompanyDocs,
  DeleteCompanyResponseDocs,
  UpdateCompanyResponseDocs,
} from './docs';
import { CompanyDocs } from '../database/docs/company.docs';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDocs })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Successful to create',
    type: CreateCompanyResponseDocs,
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter companies by name',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to get all companies',
    type: [CompanyDocs],
  })
  getAll(@Query('name') name?: string) {
    return this.companiesService.getAll(name);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the company' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to get company',
    type: CompanyDocs,
  })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the company' })
  @ApiBody({ type: UpdateCompanyDocs })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to update company',
    type: UpdateCompanyResponseDocs,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the company' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to delete company',
    type: DeleteCompanyResponseDocs,
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.delete(id);
  }
}
