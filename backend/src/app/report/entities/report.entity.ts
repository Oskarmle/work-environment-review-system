import { Optional } from '@nestjs/common';
import { FocusArea } from 'src/app/focus-area/entities/focus-area.entity';
import { SectionFieldResponse } from 'src/app/section-field-response/entities/section-field-response.entity';
import { User } from 'src/app/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @OneToMany(
    () => SectionFieldResponse,
    (sectionFieldResponse) => sectionFieldResponse.report,
  )
  sectionFieldResponses: SectionFieldResponse[];

  @ManyToMany(() => User, (user) => user.reports)
  @JoinTable()
  users: User[];
}
