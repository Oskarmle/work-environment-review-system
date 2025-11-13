import { Report } from 'src/app/report/entities/report.entity';
import { SectionField } from 'src/app/section-field/entities/section-field.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Report, (report) => report.sections)
  reports: Report[];

  @OneToMany(() => SectionField, (sectionField) => sectionField.section)
  sectionFields: SectionField[];
}
