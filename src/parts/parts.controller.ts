import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { IsAdminGuard } from '../common/guards/is-admin.guard';
// houni na3mlou controller mtaa l parts
@Controller('parts')
@UseGuards(JwtAuthGuard) // houni guard al controller kolou besh nverifyiw l jwt
export class PartsController {
  constructor(private readonly partsService: PartsService) {}
// houni na3mlou route besh naamlou create l spare part
  @Post()
  @UseGuards(IsAdminGuard)// seul un admin ynejjem ycreate spare parts
  create(@Body() createSparePartDto: CreateSparePartDto) 
  { return this.partsService.create(createSparePartDto); }
// houni na3mlou route besh nrecuperiou l spare parts lkol - ay utilisateur authentifié ynajem yshouf stock
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Patch(':id') // houni na3mlou route besh naamlou update l piéce - ken l admin ynajem yaamel update
 @UseGuards(IsAdminGuard) // Guard khass lel admin
   update(@Param('id') id: string, @Body() updateSparePartDto: UpdateSparePartDto) {
    return this.partsService.update(+id, updateSparePartDto);
  }
  @Delete(':id') // houni na3mlou route besh naamlou delete l spare part
  @UseGuards(IsAdminGuard) // Guard khass lel admin
   remove(@Param('id') id: string) {
    return this.partsService.remove(+id);
  }
} 