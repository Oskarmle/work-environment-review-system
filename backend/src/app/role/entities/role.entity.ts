import { User } from 'src/app/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
