import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from './errorCode';
export class SystemException extends HttpException {
  private otherErrorMessage: string;
  private errorCode: keyof typeof ErrorCode;

  constructor(
    errorCode: keyof typeof ErrorCode,
    statusCode: HttpStatus,
    errorMessage: any,
  ) {
    super(errorMessage, statusCode);
    this.otherErrorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ErrorCode {
    return ErrorCode[this.errorCode];
  }

  getErrorMessage(): string {
    // 内置错误码信息
    return ErrorMessage[ErrorCode[this.errorCode]];
  }

  getOtherMessage(): string {
    // 其他错误信息 => 当出现错误码以外的错误会返回这个内容
    return this.otherErrorMessage;
  }
}
