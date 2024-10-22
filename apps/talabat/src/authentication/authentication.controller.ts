import { Service } from '@app/common/microservice/enums/services.enum';
import { AuthPattern } from '@app/common/microservice/patterns/auth.pattern';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDto } from 'apps/auth-service/src/authentication/dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject(Service.AUTH) private readonly authService: ClientProxy,
  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.send(AuthPattern.SIGN_UP, signUpDto);
  }
}
