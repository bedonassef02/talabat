import { Inject, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { Service } from '@app/common/microservice/enums/services.enum';
import { ClientProxy } from '@nestjs/microservices';
import { UserPattern } from '@app/common/microservice/patterns/user.pattern';
import { HashingService } from '../hashing/hashing.service';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict.exception';
import { firstValueFrom, from, mergeMap, Observable } from 'rxjs';
import { User } from '../../../users-service/src/users/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(Service.USERS) private readonly usersService: ClientProxy,
    private readonly hashingService: HashingService,
  ) {}

  signUp(signUpDto: SignUpDto): Observable<User> {
    return this.checkIsEmailExist(signUpDto.email).pipe(
      mergeMap((isEmailExist: User) => {
        if (isEmailExist) {
          throw new RpcConflictException('email already exists');
        }
        return from(this.createUser(signUpDto));
      }),
    );
  }

  private checkIsEmailExist(email: string): Observable<User> {
    return this.usersService.send<User | null>(
      UserPattern.FIND_BY_EMAIL,
      email,
    );
  }

  private async createUser(signUpDto: SignUpDto): Promise<User> {
    signUpDto.password = await this.hashingService.hash(signUpDto.password);
    return await firstValueFrom(
      this.usersService.send<User>(UserPattern.CREATE, signUpDto),
    );
  }
}
