import { Optional } from '@nestjs/common';
import { FocusArea } from 'src/app/focus-area/entities/focus-area.entity';
import { InitialCheck } from 'src/app/initial-check/entities/initial-check.entity';
import { SectionFieldResponse } from 'src/app/section-field-response/entities/section-field-response.entity';
import { Section } from 'src/app/section/entities/section.entity';
import { Station } from 'src/app/station/entities/station.entity';
import { User } from 'src/app/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Optional()
  comment?: boolean;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => FocusArea, (focusArea) => focusArea.reports)
  focusArea: FocusArea;

  @ManyToOne(() => Station, (station) => station.reports)
  station: Station;

  @OneToMany(
    () => SectionFieldResponse,
    (sectionFieldResponse) => sectionFieldResponse.report,
  )
  sectionFieldResponses: SectionFieldResponse[];

  @ManyToMany(() => Section, (section) => section.reports)
  @JoinTable()
  sections: Section[];

  @ManyToMany(() => User, (user) => user.reports)
  @JoinTable()
  users: User[];

  @ManyToMany(() => InitialCheck, (initialCheck) => initialCheck.reports)
  @JoinTable()
  initialChecks: InitialCheck[];
}
