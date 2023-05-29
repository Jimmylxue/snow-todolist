import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { SystemException } from '.';
import { Logger } from 'nest-logs';
import { ErrorCode } from './errorCode';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor() {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status != HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.info(exception);
    } else {
      Logger.info(exception);
    }

    if (exception instanceof SystemException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
        data: {
          date:
            new Date().toLocaleDateString() +
            ' ' +
            new Date().toLocaleTimeString(),
          path: request.url,
        },
        result: exception.getOtherMessage(),
      });
    } else if (exception instanceof UnauthorizedException) {
      response.status(status).json({
        code: '-1',
        message: exception.message,
        data: {
          date:
            new Date().toLocaleDateString() +
            ' ' +
            new Date().toLocaleTimeString(),
          path: request.url,
        },
      });
    } else {
      // @ts-ignore
      // @ts-ignore
      const errorResponse = exception?.response?.message;
      // @ts-ignore
      const dtoErrorMessage =
        typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse?.join('-');
      // dot拦截时触发的错误 => 参数错误 => 手动赋值一个参数错误
      response.status(status).json({
        code: ErrorCode.REQUEST_PARAMS_ERROR_CODE,
        message: dtoErrorMessage || exception.message,
        data: {
          date:
            new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
          path: request.url,
        },
      });
    }
  }
}
