import { Body, Controller, Get, Post, Req, UseGuards ,Param,Delete} from '@nestjs/common';
import { InterventionService } from '../interventions/interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';
import { IsTechGuard } from '../common/guards/is-tech/is-tech.guard';

@Controller('interventions')
@UseGuards(JwtAuthGuard) // guard 3al controller kolou besh nverifyiw l jwt
export class InterventionController {
  constructor(private readonly interventionService: InterventionService) {}

  @Post()
  @UseGuards(IsTechGuard) // guard ken user technicien ynajem ya3mel create intervention
  create(@Body() dto: CreateInterventionDto, @Req() req) {
  // n3adiw l service create w na3tih el dto w el user eli 3amel request
    return this.interventionService.create(dto, req.user); 
  }

  @Get()
  // route besh nrecuperiw liste kol mte3 interventions
  findAll() {
    return this.interventionService.findAll();
  }
// nrecuperiw intervention wa7da b id mte3ha
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.interventionService.findOne(+id);
  }
// bch nfaskhou intervention b id mte3ha
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.interventionService.remove(+id);
  }
}
