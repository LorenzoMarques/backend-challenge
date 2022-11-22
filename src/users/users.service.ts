import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.name ||
      !createUserDto.password
    ) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const users = await this.usersRepository.find();

    const userAlreadyExists = users.find(
      (element) => element.email === createUserDto.email,
    );

    if (userAlreadyExists) {
      throw new HttpException(
        'This email is already being used',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.email'])
      .getMany();
  }

  async findOne(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.email'])
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
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
      })
      .where('id = :id', { id: id })
      .execute();

    const user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.email'])
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

  async login(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }
}
