import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogType } from '@app/common/interceptors/log-type.enum';
import { LoggingInterceptorOptions } from '@app/common/interceptors/logging-options.interface';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler: string = context.getHandler().name;
    const className: string = context.getClass().name;
    const requestData = context.switchToRpc().getData();
    this.logger = new Logger(className);

    const now: number = Date.now();

    this.log(LogType.REQ, { handler, data: requestData });

    return next.handle().pipe(
      tap({
        next: (response): void => {
          const duration: number = Date.now() - now;
          const responseData = response || 'No response data';

          this.log(LogType.RES, { handler, data: responseData, duration });
        },
        error: (error): void => {
          this.log(LogType.ERR, { handler, error });
        },
      }),
    );
  }

  private log(type: LogType, options: LoggingInterceptorOptions): void {
    const { handler, data, duration, error } = options;

    if (type === LogType.REQ) {
      this.logger.debug(
        `Request: Handler: ${handler}, Data: ${JSON.stringify(data)}`,
      );
    } else if (type === LogType.RES) {
      this.logger.log(
        `Response: Handler: ${handler}, Duration: ${duration}ms, Data: ${JSON.stringify(data)}`,
      );
    } else if (type === LogType.ERR) {
      this.logger.error(`Error: Handler: ${handler}, Error: ${error.message}`);
    }
  }
}
