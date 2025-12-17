import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';
import { IsAdminGuard } from '../common/guards/is-admin/is-admin.guard';

@Controller('devices')
@UseGuards(JwtAuthGuard) // appliquina l jwtauth guard 3al controller kolou
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // hedha route besh nassn3ou device jdid - ay utilisateur authentifié ynajjem yesta3mlou
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  // Hedha route besh nrecuperi devices kolhom - ay utilisateur authentifié ynajjem yesta3mlou
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  // hedha route besh nfasskhou device - ken  ladmin ynajjem yesta3mlou
  @Delete(':id')
  @UseGuards(IsAdminGuard) // yessta3mel l isadmin guard 
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}