import { Report } from 'src/app/report/entities/report.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InitialCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checkName: string;

  @ManyToMany(() => Report, (report) => report.initialChecks)
  reports: Report[];
}
