import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.login(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException(
      'Wrong username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(@Body() loginDto: LoginDto) {
    const payload = { username: loginDto.username, sub: loginDto.id };

    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: jwtConstants.secret,
      }),
    };
  }
}
