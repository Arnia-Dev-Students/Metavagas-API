import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { TechnologiesService } from './technologies.service';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTechnologyDocs, CreateTechnologyResponseDocs, DeleteTechnologyResponseDocs, UpdateTechnologyDocs } from './docs';
import { TechnologyDocs } from 'src/database/docs/technology.docs';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new technology' })
  @ApiBody({ type: CreateTechnologyDocs })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Successful to create technology', type: CreateTechnologyResponseDocs })
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologiesService.create(createTechnologyDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful to get all technologies', type: [TechnologyDocs] })
  getAll() {
    return this.technologiesService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a technology by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the technology' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful to get technology', type: TechnologyDocs})
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a technology by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the technology' })
  @ApiBody({ type: UpdateTechnologyDocs })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful to update technology', type: TechnologyDocs })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologiesService.update(id, updateTechnologyDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a technology by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the technology' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful to delete technology', type: DeleteTechnologyResponseDocs })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.delete(id);
  }
}
