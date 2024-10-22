import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { genSalt, compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService extends HashingService {
  async hash(data: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(data, salt);
  }
  compare(data: string, hashed: string): Promise<boolean> {
    return compare(data, hashed);
  }
}
