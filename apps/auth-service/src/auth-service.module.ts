import { Queue } from '@app/common/microservice/enums/queue.enum';
import { Service } from '@app/common/microservice/enums/services.enum';
import { MicroserviceModule } from '@app/common/microservice/microservice.module';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@app/common/interceptors/logging.interceptor';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './tokens/token.service';
import { JwtTokenService } from './tokens/jwt-token.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MicroserviceModule.register([{ name: Service.USERS, queue: Queue.USERS }]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
})
export class AuthServiceModule {}
