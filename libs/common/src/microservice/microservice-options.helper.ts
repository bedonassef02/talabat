import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_URL } from './constants';
import { Queue } from './enums/queue.enum';

export function createMicroserviceOptions(queue: Queue): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue,
      queueOptions: {
        durable: false,
      },
    },
  };
}
