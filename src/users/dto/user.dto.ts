import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_admin: boolean;
}

export class EditUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
