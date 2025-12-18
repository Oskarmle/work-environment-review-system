import { Optional } from '@nestjs/common';
import { FocusArea } from 'src/app/focus-area/entities/focus-area.entity';
import { SectionFieldResponse } from 'src/app/section-field-response/entities/section-field-response.entity';
import { Station } from 'src/app/station/entity/station.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Optional()
  comment?: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => FocusArea, (focusArea) => focusArea.reports)
  focusArea: FocusArea;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;

  @Column('simple-array', { nullable: true })
  notificationEmails: string[];

  @ManyToOne(() => Station, (station) => station.reports)
  station: Station;

  @OneToMany(
    () => SectionFieldResponse,
    (sectionFieldResponse) => sectionFieldResponse.report,
  )
  sectionFieldResponses: SectionFieldResponse[];
}
