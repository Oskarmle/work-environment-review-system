import { Report } from 'src/app/report/entities/report.entity';
import { Role } from 'src/app/role/entities/role.entity';
import { Station } from 'src/app/station/entities/station.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  hashedPassword: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Station, (station) => station.users)
  station: Station;

  @ManyToMany(() => Report, (report) => report.users)
  reports: Report[];
}
