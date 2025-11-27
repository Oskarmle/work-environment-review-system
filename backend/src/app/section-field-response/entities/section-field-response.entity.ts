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

  @Column({ nullable: true })
  @Optional()
  imageUrl?: string;

  @Column()
  isNotRelevant: boolean;

  @Column()
  isOkay: boolean;

  @ManyToOne(
    () => SectionField,
    (sectionField) => sectionField.sectionFieldResponses,
  )
  sectionField: SectionField;

  @ManyToOne(() => Report, (report) => report.sectionFieldResponses)
  report: Report;
}
