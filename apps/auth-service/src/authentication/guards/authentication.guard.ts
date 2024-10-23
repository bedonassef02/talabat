import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext) {
    const authTypes: AuthType[] = this.getAuthTypes(context);

    const guards: CanActivate[] = authTypes
      .map((type: AuthType) => this.authTypeGuardMap[type])
      .flat();
    return this.checkCanActivate(guards, context);
  }

  private async checkCanActivate(
    guards: CanActivate[],
    context: ExecutionContext,
  ) {
    let error = new UnauthorizedException();
    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((err) => {
        error = err;
      });
      if (canActivate) {
        return true;
      }
    }
    throw new UnauthorizedException(error);
  }

  private getAuthTypes(context: ExecutionContext): AuthType[] {
    return (
      this.reflector.getAllAndOverride<AuthType[]>(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [AuthenticationGuard.defaultAuthType]
    );
  }
}
