import { Optional } from '@nestjs/common';
import { Report } from 'src/app/report/entities/report.entity';
import { SectionField } from 'src/app/section-field/entities/section-field.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SectionFieldResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment?: string;

  @Column()
  @Optional()
  imageUrl?: string;

  @Column()
  @Optional()
  isRelevant?: boolean;

  @Column()
  @Optional()
  isOkay?: boolean;

  @ManyToOne(
    () => SectionField,
    (sectionField) => sectionField.sectionFieldResponses,
  )
  sectionField: SectionField;

  @ManyToOne(() => Report, (report) => report.sectionFieldResponses)
  report: Report;
}
