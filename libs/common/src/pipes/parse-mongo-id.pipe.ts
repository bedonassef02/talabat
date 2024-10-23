import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';
import { RpcBadRequestException } from '@app/common/exceptions/rpc-bad-request.exception';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new RpcBadRequestException('Invalid MongoDB ObjectId');
    }
    return new Types.ObjectId(value);
  }
}
