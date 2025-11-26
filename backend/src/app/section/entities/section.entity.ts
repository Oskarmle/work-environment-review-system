import { SectionField } from 'src/app/section-field/entities/section-field.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => SectionField, (sectionField) => sectionField.section)
  sectionFields: SectionField[];
}
