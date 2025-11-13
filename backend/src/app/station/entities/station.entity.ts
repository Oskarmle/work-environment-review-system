import { Report } from 'src/app/report/entities/report.entity';
import { User } from 'src/app/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stationName: string;

  @OneToMany(() => User, (user) => user.station)
  users: User[];

  @OneToMany(() => Report, (report) => report.station)
  reports: Report[];
}
