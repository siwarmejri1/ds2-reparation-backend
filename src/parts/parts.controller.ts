import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
// houni na3mlou controller mtaa l parts
@Controller('parts')
@UseGuards(JwtAuthGuard) // na3mlou guard besh nverifyiw authentication
export class PartsController {
  constructor(private readonly partsService: PartsService) {}
// houni na3mlou route besh naamlou create l spare part
  @Post()
  @Roles(UserRole.ADMIN) // seul un admin ynejjem ycreate spare parts
  @UseGuards(RolesGuard) // na3mlou guard besh nverifyiw roles
  create(@Body() createSparePartDto: CreateSparePartDto, @Request() req) {
    return this.partsService.create(createSparePartDto, req.user.role);
  }
// houni na3mlou route besh naamlou find all spare parts
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Patch(':id') // houni na3mlou route besh naamlou update l spare part
  @Roles(UserRole.ADMIN) // seul un admin ynejjem yaamel update
  @UseGuards(RolesGuard) // na3mlou guard besh nverifyiw roles
  update(@Param('id') id: string, @Body() updateSparePartDto: UpdateSparePartDto, @Request() req) {
    return this.partsService.update(+id, updateSparePartDto, req.user.role);
  }

  @Delete(':id') // houni na3mlou route besh naamlou delete l spare part
  @Roles(UserRole.ADMIN) // seul un admin ynejjem yaamel delete
  @UseGuards(RolesGuard) // na3mlou guard besh nverifyiw roles
  remove(@Param('id') id: string, @Request() req) {
    return this.partsService.remove(+id, req.user.role); 
  }
}