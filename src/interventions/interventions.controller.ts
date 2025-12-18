import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
    // message temporaire hatta nkamlou l implementation te3 l creation fl service
    return { message: 'POST /interventions route is working', data: dto };
  }

  @Get()
  findAll() {
    // temporaire retour factice bch nbadlouh b implementation baad fl service
    return [{ id: 1, description: 'test intervention' }];
  }
}
