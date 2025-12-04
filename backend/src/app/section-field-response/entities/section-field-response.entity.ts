import { Report } from 'src/app/report/entities/report.entity';
import { SectionField } from 'src/app/section-field/entities/section-field.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SectionFieldResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment?: string;

  @Column({ type: 'bytea', nullable: true })
  imageData?: Buffer;

  @Column({ nullable: true })
  imageMimeType?: string;

  @Column({ nullable: true })
  imageFileName?: string;

  @Column({ nullable: true })
  imageSize?: number;

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
