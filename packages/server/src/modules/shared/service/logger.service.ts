import { Injectable, Logger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService extends Logger {
  // 前端 错误上报
  private readonly errorReport = createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.label({ label: 'error-reporting' }),
      format.errors(),
      format.json(),
    ),
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
      new transports.File({ filename: 'logs/error-report.log' }),
    ],
  });

  // 系统级别错误 代码有问题 等
  private readonly infoLog = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.label({ label: 'infoLog' }),
      format.errors(),
      format.json(),
    ),
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
      new transports.File({ filename: 'logs/info-log.log' }),
    ],
  });

  log(message: string) {
    this.infoLog.log('info', message);
  }

  error(message: string, trace: string) {
    this.errorReport.error(message, trace);
  }
}
