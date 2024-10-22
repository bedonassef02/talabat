import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { MicroserviceModule } from '@app/common/microservice/microservice.module';
import { Service } from '@app/common/microservice/enums/services.enum';
import { Queue } from '@app/common/microservice/enums/queue.enum';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CatchMicroserviceExceptionsInterceptor } from '../utils/interceptors/catch-microservice-exceptions.interceptor';

@Module({
  imports: [
    MicroserviceModule.register([{ name: Service.AUTH, queue: Queue.AUTH }]),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CatchMicroserviceExceptionsInterceptor,
    },
  ],
})
export class AuthenticationModule {}
