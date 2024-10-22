import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcConflictException extends RpcException {
  constructor(message?: string) {
    super({
      message: message ?? 'Conflict occurred',
      status: HttpStatus.CONFLICT,
    });
  }
}
