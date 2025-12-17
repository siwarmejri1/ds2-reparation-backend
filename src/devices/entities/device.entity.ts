import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Intervention } from '../../interventions/entities/intervention.entity';
import { DeviceStatus } from '../../common/enums/device-status.enum';
import { DeviceGrade } from '../../common/enums/device-grade.enum';
//sna3na entité Device
@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;
 //hedha serial number unique lkol device
  @Column({ unique: true })
  serialNumber: string;

  @Column()
  brand: string;

  @Column()
  model: string;
//status mte3 device (pending, repairing, ready)
  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING,
  })
  status: DeviceStatus;
//grade mte3 device (A, B, C, NONE)
  @Column({
    type: 'enum',
    enum: DeviceGrade,
    default: DeviceGrade.NONE,
  })
  grade: DeviceGrade;
//relation one-to-many m3a interventions
  @OneToMany(() => Intervention, (intervention) => intervention.device)
  interventions: Intervention[];
//timestamps mte3 creation w update
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}