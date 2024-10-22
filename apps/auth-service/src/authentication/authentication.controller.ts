import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthPattern } from '@app/common/microservice/patterns/auth.pattern';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AuthPattern.SIGN_UP)
  create(@Payload() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }
}
