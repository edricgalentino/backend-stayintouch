import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async findBy(
    field: 'name' | 'id' | 'email',
    value: number | string,
    returnPassword: boolean,
    withValidation: boolean,
  ): Promise<Users> {
    const findedUser = await this.usersRepository
      .createQueryBuilder('users')
      .where(`users.${field} = :value`, { value })
      .getOne();

    if (!findedUser && withValidation) {
      throw new NotFoundException('User not found');
    }

    if (findedUser && !returnPassword) {
      delete findedUser.password;
    }

    return findedUser;
  }

  async getAllUser(): Promise<Users[]> {
    const allUser = await this.usersRepository.find();
    allUser.forEach((user) => {
      delete user.password;
    });
    return allUser;
  }

  async createUser(
    newUserData: Pick<Users, 'name' | 'password' | 'email' | 'is_admin'>,
  ): Promise<{
    message: string;
    access_token: string;
  }> {
    const checkUser = await this.usersRepository.findOne({
      where: [{ name: newUserData.name }, { email: newUserData.email }],
    });

    if (checkUser) {
      if (checkUser.name === newUserData.name) {
        throw new BadRequestException('Username already exists');
      }
      if (checkUser.email === newUserData.email) {
        throw new BadRequestException('Email already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(newUserData.password, 10);

    const newUser = this.usersRepository.save({
      ...newUserData,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      access_token: this.jwtService.sign({
        ...newUser,
      }),
    };
  }

  async editUser(
    user: Pick<Users, 'name' | 'email'>,
    user_id: number,
  ): Promise<Users> {
    const checkUser = await this.findBy('id', user_id, false, true);

    const updatedUser = await this.usersRepository.save({
      ...user,
      updated_at: new Date(),
    });

    return updatedUser;
  }

  async deleteUser(user_id: number): Promise<{
    message: string;
  }> {
    const checkUser = await this.findBy('id', user_id, false, true);

    const deletedUser = await this.usersRepository.remove(checkUser);

    return {
      message: `User ${deletedUser.name} deleted successfully`,
    };
  }
}
