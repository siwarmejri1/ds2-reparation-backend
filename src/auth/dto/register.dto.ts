import { IsEmail, IsString, MinLength } from 'class-validator';

// dto mt3 register user
export class RegisterDto {
  //lezm ykoun format email shih
 @IsEmail()
  email: string;

  //password lezm ykoun string w au moins 6 caracteres
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  username: string;
}