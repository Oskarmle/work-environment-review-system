import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SectionFieldResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stationName: string;
}
