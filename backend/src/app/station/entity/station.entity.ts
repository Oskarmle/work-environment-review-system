import { Report } from 'src/app/report/entities/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stationName: string;

  @OneToMany(() => Report, (report) => report.station)
  reports: Report[];
}
