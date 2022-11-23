import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.name ||
      !createUserDto.password
    ) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const users = await this.usersRepository.find();

    const userAlreadyExists = users.find(
      (element) => element.username === createUserDto.username,
    );

    if (userAlreadyExists) {
      throw new HttpException(
        'This username is already being used',
        HttpStatus.BAD_REQUEST,
      );
    }

    createUserDto.password = bcrypt.hashSync(createUserDto.password, 8);
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const cachedData = await this.cacheManager.get('cached_itens');

    if (cachedData) {
      return cachedData;
    }
    await this.cacheManager.set(
      'cached_itens',
      await this.usersRepository
        .createQueryBuilder('users')
        .select(['users.id', 'users.name', 'users.username'])
        .getMany(),
    );

    return await this.cacheManager.get('cached_itens');
  }

  async findOne(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.username'])
      .where('users.id = :id', { id: id })
      .getOne();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        username: updateUserDto.username,
        name: updateUserDto.name,
        password: bcrypt.hashSync(updateUserDto.password, 8),
      })
      .where('id = :id', { id: id })
      .execute();

    const user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.username'])
      .where('users.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async login(username: string) {
    const user = await this.usersRepository.findOneBy({ username });

    return user;
  }
}
