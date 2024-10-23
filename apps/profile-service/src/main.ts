import { NestFactory } from '@nestjs/core';
import { ProfileServiceModule } from './profile-service.module';
import { createMicroserviceOptions } from '@app/common/microservice/microservice-options.helper';
import { Queue } from '@app/common/microservice/enums/queue.enum';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ProfileServiceModule,
    createMicroserviceOptions(Queue.PROFILE),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
