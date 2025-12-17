import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { IsAdminGuard } from '../auth/guards/is-admin/is-admin.guard';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private  usersService: UsersService) {}


// fonction nraj3ou beha profile mte3 user kenou authentifié w admin bel gaurds
@Get('profile')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.userId);
  }
}
