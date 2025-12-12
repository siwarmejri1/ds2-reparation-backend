import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// controller mte3 auth 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// route mte3 nasn3ou user jdid /auth/register
  @Post('register')
  //nreciperiw les données mel body w n3aytou l service mte3 signup
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }
// route mte3 connectiw user /auth/login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }
}