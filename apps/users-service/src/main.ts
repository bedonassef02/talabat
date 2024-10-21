import { NestFactory } from '@nestjs/core';
import { UsersServiceModule } from './users-service.module';
import { Queue } from '@app/common/microservice/enums/queue.enum';
import { MicroserviceOptions } from '@nestjs/microservices';
import { createMicroserviceOptions } from '@app/common/microservice/microservice-options.helper';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersServiceModule,
    createMicroserviceOptions(Queue.USERS),
  );
  await app.listen();
}
bootstrap();
