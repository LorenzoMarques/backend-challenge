import { Movie } from 'src/movies/entities/movie.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
