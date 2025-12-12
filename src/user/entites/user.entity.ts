import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from '../../interventions/entities/intervention.entity';
import { TimeStampInfo } from '../../common/timestamp';
import { Roles } from '../../common/enums/user-role.enum';

//sna3na l user entity 
// w extends men timestampinfo bach ykoun 3andouu les champs createdAt, updatedAt, deletedAt
@Entity()
export class User extends TimeStampInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

// zedna l role b enum Roles (TECH, ADMIN) 
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.ROLE_USER, //w par default yekhou TECH
  })
  role: Roles;

//relation one-to-many m3a l interventions
  @OneToMany(() => Intervention, (intervention) => intervention.user)
  interventions: Intervention[];
 }