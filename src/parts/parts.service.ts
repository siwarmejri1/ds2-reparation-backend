import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable() // houni na3mlou service mtaa l parts
export class PartsService {
// 3mlna l constructor besh naamlou inject l repository mtaa l spare parts
  constructor(
    @InjectRepository(SparePart)
    private sparePartsRepository: Repository<SparePart>,
  ) {}

  async create(createSparePartDto: CreateSparePartDto, userRole: UserRole): Promise<SparePart> {
    // houni na3mlou vérification li seul un admin ynejjem ycreate spare parts
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can create spare parts');
    }
 // houni na3mlou create w save l spare part jdida
    const sparePart = this.sparePartsRepository.create(createSparePartDto);
    return this.sparePartsRepository.save(sparePart);
  }
// houni na3mlou find all spare parts
  async findAll(): Promise<SparePart[]> {
    return this.sparePartsRepository.find();
  }
// houni na3mlou find one spare part b id mteeou
  async findOne(id: number): Promise<SparePart> {
    const sparePart = await this.sparePartsRepository.findOne({ where: { id } });
    
    if (!sparePart) {
      throw new NotFoundException(`Spare part with ID ${id} not found`);
    }
    
    return sparePart;
  }
 // houni na3mlou update l spare part
  async update(id: number, updateSparePartDto: UpdateSparePartDto, userRole: UserRole): Promise<SparePart> {
    //houni na3mlou vérification li seul un admin ynejjem yaamel update
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can update spare parts');
    }

    const sparePart = await this.findOne(id);
    // houni na3mlou merge bin l données l jdida w l ancienne données
    Object.assign(sparePart, updateSparePartDto);
    // houni na3mlou save l spare part m3a l données l jdida
    return this.sparePartsRepository.save(sparePart);
  }

  async remove(id: number, userRole: UserRole): Promise<void> {
    // houni na3mlou vérification li seul un admin ynejjem yaamel delete
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete spare parts');
    }

    const sparePart = await this.findOne(id);
    await this.sparePartsRepository.remove(sparePart);
  }

  // hedhi méthode besh na9ssou stock mtaa spare part
  async decrementStock(sparePartId: number, quantity: number): Promise<void> {
    await this.sparePartsRepository.decrement(
      { id: sparePartId },
      'stock',
      quantity,
    );
  }

  // hedhi méthode besh nverifyi stock mtaa spare part
  async checkStock(sparePartId: number, requiredQuantity: number): Promise<boolean> {
    const sparePart = await this.findOne(sparePartId);
    return sparePart.stock >= requiredQuantity;
  }
}