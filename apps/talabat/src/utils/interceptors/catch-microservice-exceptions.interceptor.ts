import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CatchMicroserviceExceptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.error('Microservice Exception Caught:', error);

        if (!(error instanceof HttpException)) {
          return throwError(
            () => new HttpException(error.message, error.status),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
