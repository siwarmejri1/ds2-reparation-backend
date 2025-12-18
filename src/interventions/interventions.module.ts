import { Module } from '@nestjs/common';
import { InterventionController } from './interventions.controller';
import { InterventionService } from './interventions.service';

@Module({
  controllers: [InterventionController],
  providers: [InterventionService]
})
export class InterventionModule {}
