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
import { CreateTechnologiesDto } from './dto/create-technology.dto';
import { TechnologiesService } from './technologies.service';
import { UpdateTechnologiesDto } from './dto/update-technologies.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new technology' })
  @ApiBody({ type: CreateTechnologiesDto })
  @ApiResponse({ })
  @ApiResponse({ })
  create(@Body() createTechnologiesDto: CreateTechnologiesDto) {
    return this.technologiesService.create(createTechnologiesDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  @ApiResponse({ })
  @ApiResponse({ })
  getAll() {
    return this.technologiesService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a technology by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the technology' })
  @ApiResponse({ })
  @ApiResponse({ })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a technology by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the technology' })
  @ApiBody({ type: UpdateTechnologiesDto })
  @ApiResponse({ })
  @ApiResponse({ })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologiesDto: UpdateTechnologiesDto,
  ) {
    return this.technologiesService.update(id, updateTechnologiesDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a technology by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the technology' })
  @ApiResponse({ })
  @ApiResponse({ })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.delete(id);
  }
}
