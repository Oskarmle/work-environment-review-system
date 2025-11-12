import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FocusAreas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: Date;

  @Column()
  isActive: boolean;
}
