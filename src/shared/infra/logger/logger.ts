import * as winston from 'winston';

type Config = { service: string };

export class Logger {
  logger: winston.Logger;

  constructor(private readonly config: Config) {
    this.logger = winston
      .createLogger({
        defaultMeta: {
          service: this.config.service,
          source: 'development',
        },
        format: winston.format.json(),
        level: 'info',
      })
      .add(
        new winston.transports.Console({
          format: winston.format.json(),
        })
      );
  }

  error(data: any) {
    this.logger.error(data);
  }

  info(data: any) {
    this.logger.info(data);
  }

  warn(data: any) {
    this.logger.warn(data);
  }
}
