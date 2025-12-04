import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InitialCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checkName: string;
}
