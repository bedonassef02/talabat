import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcNotFoundException extends RpcException {
  constructor(message?: string) {
    super({
      message: message ?? 'Not Found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
