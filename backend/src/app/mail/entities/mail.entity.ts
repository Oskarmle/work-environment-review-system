import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mail: string;
}
