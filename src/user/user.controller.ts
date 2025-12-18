import { Controller, Get, Req, UseGuards, Post, Body} from '@nestjs/common';
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth/jwt-auth.guard';
import { IsAdminGuard } from '../../src/common/guards/is-admin/is-admin.guard';
import { UsersService } from './user.service';
import { RegisterDto } from '../auth/dto/register.dto';

@UseGuards(JwtAuthGuard, IsAdminGuard) // houni 7atina les guards 3al controller kolou
@Controller('users')
export class UsersController {
    constructor(private  usersService: UsersService) {}


// fonction nraj3ou beha profile mte3 user kenou authentifié w admin bel gaurds
@Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.userId);
  }

// route bch nasn3ou admin jdid (suelemnt les admins ynejmou yest3amlouha )
@Post('create-admin')
  createAdmin(@Body() registerDto: RegisterDto) {
    return this.usersService.createAdmin(registerDto);
  }
}
