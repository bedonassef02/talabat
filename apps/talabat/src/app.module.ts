import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from '../../auth-service/src/authentication/guards/authentication.guard';
import { AccessTokenGuard } from '../../auth-service/src/authentication/guards/access-token.guard';
import { TokenService } from '../../auth-service/src/tokens/token.service';
import { JwtTokenService } from '../../auth-service/src/tokens/jwt-token.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../auth-service/src/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    AuthenticationModule,
    ProfileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
