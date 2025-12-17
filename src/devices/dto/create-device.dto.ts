import {   IsString,IsOptional,IsEmail, IsPhoneNumber,IsNumber,IsPositive,MaxLength,IsEnum,IsBoolean } from 'class-validator';
import { DeviceGrade } from '../../common/enums/device-grade.enum';
import { DeviceStatus } from 'src/common/enums/device-status.enum';
//DTO lkol ma tji device jdida
export class CreateDeviceDto {
  Q// serial number unique lkol device
  @IsString()
 @MaxLength(100)
  serialNumber: string;
// brand mte3 device
  @IsString()
 @MaxLength(50)
  brand: string;
// model mte3 device
  @IsString()
  @MaxLength(50)
  model: string;
// grade mte3 device (A, B, C, NONE)
  @IsEnum(DeviceGrade)
  grade?: DeviceGrade;

// status mte3 device (pending, repairing, ready)
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;
}