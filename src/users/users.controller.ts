import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDTO, RegisterUserDTO } from './dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Public } from 'src/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllUser() {
    return await this.usersService.getAllUser();
  }

  @UseGuards(AuthGuard)
  @Get(':user_id')
  async getUser(@Param('user_id') user_id: string) {
    return await this.usersService.findBy('id', +user_id, false, true);
  }

  @Public()
  @Post('register')
  async createUser(@Body() newUser: RegisterUserDTO) {
    return await this.usersService.createUser(newUser);
  }

  @UseGuards(AuthGuard)
  @Patch(':user_id')
  async editUser(@Param('user_id') user_id: string, @Body() user: EditUserDTO) {
    return await this.usersService.editUser(user, +user_id);
  }

  @UseGuards(AuthGuard)
  @Delete(':user_id')
  async deleteUser(@Param('user_id') user_id: string) {
    return await this.usersService.deleteUser(+user_id);
  }
}
