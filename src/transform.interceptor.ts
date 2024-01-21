import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        const response = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'success',
          data: data,
        };
        return response;
      }),
      catchError((error) => {
        if (
          error.response &&
          error.response.message &&
          Array.isArray(error.response.message)
        ) {
          error.response.errors = error.response.message;
          error.response.message = error.response.message[0];
        }
        return throwError(error);
      }),
    );
  }
}
