import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Intervention } from '../interventions/entities/interventions.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { User } from '../user/entites/user.entity';
import { Device } from '../devices/entities/device.entity';
import { SparePart } from '../parts/entities/spare-part.entity';
import { DeviceStatus } from '../common/enums/device-status.enum';
import { DevicesService } from 'src/devices/devices.service';
import { PartsService } from 'src/parts/parts.service';

@Injectable()
export class InterventionService { // service responsable 3al logique mta3 interventions
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>, // repository mta3 interventions

    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>, // repository mta3 devices

    @InjectRepository(SparePart)
    private readonly sparePartsRepository: Repository<SparePart>, // repository mta3 spare parts

    private readonly dataSource: DataSource, // DataSource mta3 TypeORM lezmou 3al transaction
    private readonly devicesService: DevicesService,
    private partsService: PartsService,
) {}

  async create(createInterventionDto: CreateInterventionDto, user: User)  // logique mta3 création intervention
   : Promise<Intervention> {
      // hnee besh naamlou transaction 3al database barcha opérations lezmhom ykounou atomic
      const device = await this.devicesRepository.findOne({
      where: { id: createInterventionDto.deviceId },
      });

      if (!device) {
          throw new NotFoundException(`Device with ID ${createInterventionDto.deviceId} not found`);
      }

      // hedhi besh nverifiou byha ken spare parts valides w mawjoudin kolhom
    const spareParts = await this.sparePartsRepository.findByIds(
      createInterventionDto.sparePartIds,
    );
      if (spareParts.length !== createInterventionDto.sparePartIds.length) {
       throw new NotFoundException('One or more spare parts not found');
      }

      // hnee besh nverifiou stock o ndecrementiwouh
       const queryRunner = this.dataSource.createQueryRunner();
    
       await queryRunner.connect();
       await queryRunner.startTransaction();

       try {
      // besh nverifiou stock mtaa3 kol piece 
      for (const sparePart of spareParts) {
        const hasStock = await this.partsService.checkStock(sparePart.id, 1);
        
        if (!hasStock) {
          throw new BadRequestException(`Insufficient stock for spare part: ${sparePart.name}`);
        }
      }

      // lhnee besh ndecrementiou stock mte3 kol spare part
      for (const sparePart of spareParts) {
        await this.partsService.decrementStock(sparePart.id, 1);
      }
    
      // besh nassn3ou l intervention
      const intervention = queryRunner.manager.create(Intervention, {
        description: createInterventionDto.description,
        technician: user, // injectineha mel jwt
        device : device,
        spareParts: spareParts,
      });

       const savedIntervention = await queryRunner.manager.save(intervention);
     // besh naadiou device status l REPAIRING
      device.status = DeviceStatus.REPAIRING;
        await queryRunner.manager.save(device);

    // kol shy taada ça va , nvalidiou el transaction
      await queryRunner.commitTransaction();
      
      return savedIntervention;
    }
    catch (error) {
      //ken fama erreur saret n'annuliou kol shy 3mlneh fl transaction
      await queryRunner.rollbackTransaction();
      throw error;
  }
  finally {
      // nliberiou l  queryRunner
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Intervention[]> { // logique mta3 recuperation lkol interventions
    return this.interventionRepository.find({
      relations: ['device', 'technician', 'spareParts'],// njibou m3ahom les relations mte3hom
    });
  }
    async findOne(id: number): Promise<Intervention> { // logique mta3 recuperation intervention b id mte3ou
    const intervention = await this.interventionRepository.findOne({
      where: { id },
      relations: ['device', 'technician', 'spareParts'],
    });
    
    if (!intervention) { //ken ma l9ach intervention b id hedha
      throw new NotFoundException(`Intervention with ID ${id} not found`); //erreur 404
    }
    
    return intervention;
  }

  async remove(id: number): Promise<void> { // logique mta3 tafssykh l  intervention
    const intervention = await this.findOne(id);
    await this.interventionRepository.remove(intervention);
  }
}