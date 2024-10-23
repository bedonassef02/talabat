import { Module } from '@nestjs/common';
import { MicroserviceModule } from '@app/common/microservice/microservice.module';
import { Service } from '@app/common/microservice/enums/services.enum';
import { Queue } from '@app/common/microservice/enums/queue.enum';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@app/common/interceptors/logging.interceptor';

@Module({
  imports: [
    MicroserviceModule.register([{ name: Service.USERS, queue: Queue.USERS }]),
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class ProfileServiceModule {}
