import { DynamicModule, Module } from '@nestjs/common';
import { MicroserviceModuleOptions } from './interfaces/microservice-module-options.interface';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_URL } from './constants';

@Module({})
export class MicroserviceModule {
  static register(options: MicroserviceModuleOptions[]): DynamicModule {
    return ClientsModule.register(
      options.map((option) => ({
        name: option.name,
        transport: Transport.RMQ,
        options: {
          urls: option.urls ?? [RMQ_URL],
          queue: option.queue,
          queueOptions: {
            durable: false,
          },
        },
      })),
    );
  }
}
