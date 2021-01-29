import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatusTypes } from 'src/types/response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exceptionResponse === 'string'
        ? `${exceptionResponse}.`
        : // @ts-ignore
          `${exceptionResponse.message}.`;

    const data =
      exception instanceof HttpException
        ? // @ts-ignore
          exception.getResponse().data
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // @ts-ignore
    if (message.includes('JSON')) message = 'Invalid JSON payload passed.';

    response.status(status).json({
      message,
      status: StatusTypes.ERROR,
      data: data || null,
    });
  }
}
