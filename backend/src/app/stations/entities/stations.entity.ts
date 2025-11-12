import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stationName: string;
}
