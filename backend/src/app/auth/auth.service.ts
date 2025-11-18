import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    hashedPassword: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === hashedPassword) {
      return user;
    }
    return null;
  }
}
