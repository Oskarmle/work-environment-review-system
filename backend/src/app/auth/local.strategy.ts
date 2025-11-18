import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { User } from 'src/types/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(email: string, hashedPassword: string): Promise<User | null> {
    const user = await this.authService.validateUser(email, hashedPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
