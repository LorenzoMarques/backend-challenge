import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private usersService: UsersService,
  ) {}
  async create(createMovieDto: CreateMovieDto, user_id: number) {
    const movie = await this.moviesRepository.create(createMovieDto);
    const user = await this.usersService.findOne(user_id);
    movie.user = user;

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!createMovieDto.genre || !createMovieDto.name) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return await this.moviesRepository.save(movie);
  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.moviesRepository
      .createQueryBuilder()
      .update(Movie)
      .set({
        name: updateMovieDto.name,
        genre: updateMovieDto.genre,
      })
      .where('id = :id', { id: id })
      .execute();

    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async remove(id: number) {
    return await this.moviesRepository.delete(id);
  }
}
