import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { Users } from 'src/users/entity/users.entity';

@Injectable({})
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDTO): Promise<{
    data: Users;
    message: string;
    status: number;
    access_token: string;
  }> {
    const checkUser = await this.usersService.findBy(
      'name',
      user.username,
      true,
      true,
    );

    const isPasswordCorrect = bcrypt.compareSync(
      user.password,
      checkUser.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong password');
    }

    delete checkUser.password;

    return {
      message: 'Login successful',
      status: 200,
      data: checkUser,
      access_token: this.jwtService.sign({
        ...checkUser,
      }),
    };
  }
}
