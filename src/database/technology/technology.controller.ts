import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  //buscar todas as tecnologias
  @Get()
  async getAll() {
    return await this.technologyService.getAll();
  }
  //buscar tecnologia pelo id
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.technologyService.getById(id);
  }

  // criar tecnologia se for admin
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: any) {
    return await this.technologyService.create(body);
  }

  // atualizar tecnologia pelo id se for admin
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.technologyService.update(id, body);
  }

  // deletar tecnologia pelo id se for admin
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number) {
    await this.technologyService.delete(id);
  }
}
