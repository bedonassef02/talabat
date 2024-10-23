import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../tokens/token.service';
import { REQUEST_USER_KEY } from '../../auth.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const payload: ActiveUserData = await this.tokenService.verify(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    request[REQUEST_USER_KEY] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
