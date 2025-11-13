import { Report } from 'src/app/report/entities/report.entity';
import { Role } from 'src/app/role/entities/role.entity';
import { Station } from 'src/app/station/entities/station.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Station, (station) => station.users)
  station: Station;

  @ManyToMany(() => Report, (report) => report.users)
  reports: Report[];
}
