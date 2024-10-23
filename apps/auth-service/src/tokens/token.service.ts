import { User } from '../../../users-service/src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Tokens } from './tokens.interface';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export abstract class TokenService {
  abstract generateTokens(user: User): Promise<Tokens>;
  abstract verify(token: string): Promise<ActiveUserData>;
  // abstract refreshTokens(refreshToken: string): Promise<Tokens>;
  protected abstract signToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string>;
}
