import 'winston-daily-rotate-file';

import httpContext from 'express-http-context';
import { get } from 'stack-trace';
import type { Logger as WinstonLogger } from 'winston';
import { createLogger, format, transports } from 'winston';

const { combine, json, printf, timestamp } = format;

const timeZoned = () =>
  new Date().toLocaleDateString('pt-Br', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Sao_Paulo',
    timeZoneName: 'short',
  });

const logFormat = printf(
  ({ level, message, method, path, requestId, timestamp }) =>
    `level=${level} message=${message} path=${path} method=${method} requestId=${requestId} timestamp=${timestamp}`
);

export class Logger {
  public logger: WinstonLogger;

  constructor(private readonly environment: string) {
    const transportArray = [];

    switch (environment) {
      case 'PROD': {
        transportArray.push(
          new transports.Console({
            format: combine(timestamp({ format: timeZoned }), logFormat),
          }),
          new transports.DailyRotateFile({
            datePattern: 'DD-MM-YYYY',
            filename: './logs/octopost-backend-%DATE%.log',
            format: json(),
            maxFiles: '1d',
            maxSize: '1m',
            zippedArchive: true,
          })
        );
        break;
      }
      default: {
        transportArray.push(
          new transports.Console({
            format: combine(timestamp({ format: timeZoned }), logFormat),
          })
        );
        break;
      }
    }

    this.logger = createLogger({
      format: combine(timestamp({ format: timeZoned }), logFormat),
      level: environment == 'PROD' ? 'info' : 'debug',
      transports: transportArray,
    });
  }

  public debug(message: string): void {
    this.log('debug', message);
  }

  public error(message: string): void {
    this.log('error', message);
  }
  public info(message: string): void {
    this.log('info', message);
  }

  private log(level: string, message: string) {
    const [path, method] = getCurrentFileInfo();
    const requestId = getRequestIdFromContext();
    this.logger.log(level, {
      message,
      method,
      path,
      requestId,
    });
  }

  public warn(message: string): void {
    this.log('warn', message);
  }
}

function getRequestIdFromContext() {
  return httpContext.get('requestId');
}

function getCurrentFileInfo() {
  try {
    const stack = get();
    const caller = stack[3];
    return [caller.getFileName(), caller.getFunctionName()];
  } catch (_) {
    return ['unknown', 'unknown'];
  }
}
