import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { createMicroserviceOptions } from '@app/common/microservice/microservice-options.helper';
import { Queue } from '@app/common/microservice/enums/queue.enum';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AuthServiceModule,
      createMicroserviceOptions(Queue.AUTH),
    );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
