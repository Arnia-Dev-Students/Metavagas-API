import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserDto } from '../decorators/dto/current-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@CurrentUser() user: CurrentUserDto) {
    return this.usersService.me(user.user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }
}
