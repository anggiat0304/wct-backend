import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto{
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}