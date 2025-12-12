import { Report } from 'src/app/report/entities/report.entity';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Report, (report) => report.users)
  reports: Report[];
}
