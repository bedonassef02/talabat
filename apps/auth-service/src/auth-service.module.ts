import { Queue } from '@app/common/microservice/enums/queue.enum';
import { Services } from '@app/common/microservice/enums/services.enum';
import { MicroserviceModule } from '@app/common/microservice/microservice.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MicroserviceModule.register([{ name: Services.AUTH, queue: Queue.AUTH }]),
  ],
})
export class AuthServiceModule {}
