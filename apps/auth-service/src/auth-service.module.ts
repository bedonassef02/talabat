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

@Module({
  imports: [
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
  ],
})
export class AuthServiceModule {}
