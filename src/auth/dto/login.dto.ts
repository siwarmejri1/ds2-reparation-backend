import { IsEmail, IsString } from 'class-validator';

// dto mt3 login user
export class LoginDto {
// format email
  @IsEmail()
  email: string; 

  @IsString()
  password: string;
}