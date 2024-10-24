import { Service } from '@app/common/microservice/enums/services.enum';
import { AuthPattern } from '@app/common/microservice/patterns/auth.pattern';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDto } from 'apps/auth-service/src/authentication/dto/sign-up.dto';
import { SignInDto } from '../../../auth-service/src/authentication/dto/sign-in.dto';
import { Auth } from '../../../auth-service/src/authentication/decorators/auth.decorator';
import { AuthType } from '../../../auth-service/src/authentication/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject(Service.AUTH) private readonly authService: ClientProxy,
  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.send(AuthPattern.SIGN_UP, signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.send(AuthPattern.SIGN_IN, signInDto);
  }
}
