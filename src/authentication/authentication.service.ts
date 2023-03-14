import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import * as crypto from 'crypto';
import crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return {
      password: crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex'),
      salt: salt,
    };
  };

  compareHashPassword = (hashedPassword, password, salt) => {
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    if (hash === hashedPassword) {
      return true;
    }
    return false;
  };

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await this.hashPassword(registrationData.password);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword.password,
        salt: hashedPassword.salt,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching = await this.compareHashPassword(
        user.password,
        hashedPassword,
        user.salt,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
