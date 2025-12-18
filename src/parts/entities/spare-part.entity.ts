import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
// importina l entité mtaa l intervention besh naamlou l relation mtaa spare parts
import { Intervention } from '../../interventions/entities/interventions.entity';
// sna3na l entité mtaa spare part
@Entity('spare_parts')
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
//besh naamlou relation mtaa spare part m3a intervention
@ManyToMany(() => Intervention, (intervention) => intervention.spareParts) interventions: Intervention[];
// 3malna timestamps besh na3rfou waqt l creation w l update mtaa l spare part
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}