import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { SparePart } from './entities/spare-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])], // hedhi besh naamlou inject l repository mtaa l spare parts
  controllers: [PartsController], // hedhi mta3 l controller mtaa l parts
  providers: [PartsService], // hedhi mta3 l service mtaa l parts
  exports: [PartsService], // hedhi mta3 export l service ken 7ab na3mlou inject fi module okhra
})
export class PartsModule {}