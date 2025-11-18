import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as brycpt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    hashedPassword: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.hashedPassword === hashedPassword) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await brycpt.hash(
      createUserDto.password,
      saltRounds,
    );

    const userWithHashedPassword = {
      ...createUserDto,
      hashedPassword: hashedPassword,
    };

    await this.usersService.create(userWithHashedPassword);
  }
}
