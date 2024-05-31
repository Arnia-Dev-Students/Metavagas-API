import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserDto } from '../decorators/dto/current-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDocs } from '../database/docs/user.docs';
import { DeleteUserResponseDocs, UpdateUserDocs } from './docs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to get all users',
    type: [UserDocs],
  })
  async getAll() {
    return await this.usersService.getAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to get user',
    type: UserDocs,
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the user' })
  @ApiBody({ type: UpdateUserDocs })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to update user',
    type: UserDocs,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.usersService.update(id, data, user.user, user.role);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful to delete user',
    type: DeleteUserResponseDocs,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.usersService.delete(id, user.user, user.role);
  }
}
