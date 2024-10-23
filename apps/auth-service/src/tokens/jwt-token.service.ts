import { TokenService } from './token.service';
import { User } from '../../../users-service/src/users/entities/user.entity';
import { Tokens } from './tokens.interface';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import jwtConfig from '../config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Promise } from 'mongoose';

export class JwtTokenService extends TokenService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async generateTokens(user: User): Promise<Tokens> {
    const refreshTokenId: string = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
          role: user.role,
        },
      ),
      this.signToken<{ refreshTokenId: string }>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        {
          refreshTokenId,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  protected async signToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  verify(token: string): Promise<ActiveUserData> {
    try {
      return this.jwtService.verifyAsync(token, this.jwtConfiguration);
    } catch {
      return null;
    }
  }
}
