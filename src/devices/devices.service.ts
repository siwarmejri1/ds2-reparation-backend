import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device} from './entities/device.entity';
import {  DeviceStatus } from '../common/enums/device-status.enum';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';


@Injectable() //service lkol ma ykoun 3andna logique mte3 devices
export class DevicesService {
  constructor( //injection mte3 repository mte3 device
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>, //repository mte3 device
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> { //méthode pour créer un nouvel appareil
    // Vérifier si le numéro de série existe déjà
    const existingDevice = await this.devicesRepository.findOne({
      where: { serialNumber: createDeviceDto.serialNumber },
    });
    
    if (existingDevice) { //si le serial number déjà existe
      throw new ForbiddenException('Device with this serial number already exists');
    }

    const device = this.devicesRepository.create(createDeviceDto); //création mte3 device jdida
    return this.devicesRepository.save(device); //sauvegarde l device fl base
  }

  async findAll(): Promise<Device[]> { //méthode pour récupérer tous les appareils
    return this.devicesRepository.find({
      relations: ['interventions'], //jib m3ahom interventions mte3hom
    });
  }

  async findOne(id: number): Promise<Device> { //méthode pour récupérer un appareil par son ID
    const device = await this.devicesRepository.findOne({
      where: { id },
      relations: ['interventions'],
    });
    
    if (!device) { //si ma l9ach device b id hedha
      throw new NotFoundException(`Device with ID ${id} not found`); //erreur 404
    }
    
    return device;
  }

  async remove(id: number, userRole: UserRole): Promise<void> { //méthode besh nfassakh device
    // nverifiou ely ken l admin ynajem yfassakh device
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete devices'); //erreur si l user mahoush admin
    }

    const device = await this.findOne(id); 
    await this.devicesRepository.remove(device);
  }

  // hedhi méthode jdida pour update status mte3 device
  async updateStatus(id: number, status: DeviceStatus): Promise<Device> {
    const device = await this.findOne(id); //l9a device b id hedha
    device.status = status; //badal status mte3ou
    return this.devicesRepository.save(device);//sauvegarde l update fl base
  }
}