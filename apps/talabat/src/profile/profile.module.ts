import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { MicroserviceModule } from '@app/common/microservice/microservice.module';
import { Service } from '@app/common/microservice/enums/services.enum';
import { Queue } from '@app/common/microservice/enums/queue.enum';

@Module({
  imports: [
    MicroserviceModule.register([
      { name: Service.PROFILE, queue: Queue.PROFILE },
    ]),
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}
