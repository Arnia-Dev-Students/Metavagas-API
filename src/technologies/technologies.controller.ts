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

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post()
  create(@Body() createTechnologiesDto: CreateTechnologiesDto) {
    return this.technologiesService.create(createTechnologiesDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.technologiesService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologiesDto: UpdateTechnologiesDto,
  ) {
    return this.technologiesService.update(id, updateTechnologiesDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.delete(id);
  }
}
