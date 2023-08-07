import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: import('@nestjs/common').ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.message, exception.getStatus());
    }
  }
}
