import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionController } from './interventions.controller';
import { InterventionService } from './interventions.service';
import { Intervention } from './entities/interventions.entity';
import { DevicesModule } from '../devices/devices.module';
import { PartsModule } from '../parts/parts.module';
import { Device } from 'src/devices/entities/device.entity';
import { SparePart } from 'src/parts/entities/spare-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention , Device, SparePart]), // importation mta3 TypeOrmModule b entities mta3 Intervention, Device, SparePart
    DevicesModule, // importation mta3 DevicesModule
    PartsModule,   // importation mta3 PartsModule
  ],
  controllers: [InterventionController],
  providers: [InterventionService],
   exports: [InterventionService],
})
export class InterventionModule {}
