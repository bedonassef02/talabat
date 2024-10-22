import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcBadRequestException extends RpcException {
  constructor(message?: string) {
    super({
      message: message ?? 'Bad Request',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
