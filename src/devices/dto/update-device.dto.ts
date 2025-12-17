import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
//DTO lkol ma tji update l device mawjouda
export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}