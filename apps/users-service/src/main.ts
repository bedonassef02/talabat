import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { createMicroserviceOptions } from '@app/common/microservice/microservice-options.helper';
import { Queue } from '@app/common/microservice/enums/queue.enum';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { UsersServiceModule } from './users-service.module';

async function bootstrap(): Promise<void> {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      UsersServiceModule,
      createMicroserviceOptions(Queue.USERS),
    );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
