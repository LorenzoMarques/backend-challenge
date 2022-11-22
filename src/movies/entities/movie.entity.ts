import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.movies, {
    nullable: false,
  })
  @JoinColumn()
  user: User;
}
