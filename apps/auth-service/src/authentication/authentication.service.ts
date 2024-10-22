import { Inject, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { Service } from '@app/common/microservice/enums/services.enum';
import { ClientProxy } from '@nestjs/microservices';
import { UserPattern } from '@app/common/microservice/patterns/user.pattern';
import { HashingService } from '../hashing/hashing.service';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict.exception';
import { firstValueFrom, from, map, mergeMap, Observable } from 'rxjs';
import { User } from '../../../users-service/src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found.exception';
import { RpcBadRequestException } from '@app/common/exceptions/rpc-bad-request.exception';
import { TokenService } from '../tokens/token.service';
import { Tokens } from '../tokens/tokens.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(Service.USERS) private readonly usersService: ClientProxy,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  signUp(signUpDto: SignUpDto): Observable<Tokens> {
    return this.checkIsEmailExist(signUpDto.email).pipe(
      mergeMap((isEmailExist: User) => {
        if (isEmailExist) {
          throw new RpcConflictException('email already exists');
        }
        return from(this.createUser(signUpDto)).pipe(
          mergeMap((user: User) => {
            return from(this.tokenService.generateTokens(user));
          }),
        );
      }),
    );
  }

  signIn(signInDto: SignInDto): Observable<Tokens> {
    return this.checkIsEmailExist(signInDto.email).pipe(
      mergeMap((user: User | null) => {
        if (!user) {
          throw new RpcNotFoundException('Email not found');
        }
        return this.isPasswordCorrect(signInDto.password, user.password).pipe(
          mergeMap(() => {
            return from(this.tokenService.generateTokens(user));
          }),
        );
      }),
    );
  }

  private checkIsEmailExist(email: string): Observable<User | null> {
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

  private isPasswordCorrect(
    password: string,
    userPassword: string,
  ): Observable<boolean> {
    return from(this.hashingService.compare(password, userPassword)).pipe(
      map((isPasswordCorrect: boolean) => {
        if (!isPasswordCorrect) {
          throw new RpcBadRequestException('Incorrect password');
        }
        return true;
      }),
    );
  }
}
