import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthPattern } from '@app/common/microservice/patterns/auth.pattern';
import { SignInDto } from './dto/sign-in.dto';
import { Observable } from 'rxjs';
import { Tokens } from '../tokens/tokens.interface';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AuthPattern.SIGN_UP)
  signUp(@Payload() signUpDto: SignUpDto): Observable<Tokens> {
    return this.authenticationService.signUp(signUpDto);
  }

  @MessagePattern(AuthPattern.SIGN_IN)
  signIn(@Payload() signInDto: SignInDto): Observable<Tokens> {
    return this.authenticationService.signIn(signInDto);
  }
}
