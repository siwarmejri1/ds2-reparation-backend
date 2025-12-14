import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device } from './entities/device.entity';
//hedha module mte3 devices
@Module({
  imports: [TypeOrmModule.forFeature([Device])], //importation mta3 TypeOrmModule b entity mta3 Device
  controllers: [DevicesController], //controller mte3 devices
  providers: [DevicesService], //service mte3 devices
  exports: [DevicesService], // exportation mte3 service mte3 devices
})
export class DevicesModule {} 