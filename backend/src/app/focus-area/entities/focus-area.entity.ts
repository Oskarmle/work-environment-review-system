import { Report } from 'src/app/report/entities/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FocusArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  isActive: boolean;

  @OneToMany(() => Report, (report) => report.focusArea)
  reports: Report[];
}
