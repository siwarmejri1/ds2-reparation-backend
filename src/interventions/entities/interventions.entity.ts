import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entites/user.entity';
import { Device } from '../../devices/entities/device.entity';
import { SparePart } from '../../parts/entities/spare-part.entity';
import { TimeStampInfo } from 'src/common/timestamp';

@Entity()
//sna3na l intervention entity 
// w extends men timestampinfo bach ykoun 3andouu l champs createdAt mte3 date +les autres champs
export class Intervention extends TimeStampInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

// Relation m3a l user li t3ayetlou Intervention realisé par 1 user

  @ManyToOne(() => User, (user) => user.interventions, { eager: true })
  user: User;

// Relation m3a l device li 3andou Intervention
  @ManyToOne(() => Device, (device) => device.interventions, { eager: true })
  device: Device;

// Relation m3a spare parts li est3mlou fiha l intervention
  @ManyToMany(() => SparePart, { eager: true })
  @JoinTable()
  spareParts: SparePart[];
}
