import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as brycpt from 'bcrypt';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
      },
    });
    if (!user) {
      return null;
    }

    const isMatch = await brycpt.compare(password, user.hashedPassword);
    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne({
      where: { email: loginUserDto.email },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await brycpt.compare(
      loginUserDto.password,
      user.hashedPassword,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne({
      where: { email: createUserDto.email },
    });
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
