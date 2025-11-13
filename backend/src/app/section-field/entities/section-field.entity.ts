import { Section } from 'src/app/section/entities/section.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SectionField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  whatToCheck: string;

  @Column()
  lawInspection: boolean;

  @Column()
  internalControl: boolean;

  @Column()
  howToCheck: string;

  @Column()
  responsibility: string;

  @ManyToOne(() => Section, (section) => section.sectionFields)
  section: Section;
}
