import httpContext from 'express-http-context';
import { get } from 'stack-trace';
import type { Mock } from 'vitest';
import { transports } from 'winston';

import { Logger } from './logger';

const logginMatch = (
  level: string,
  message: string,
  requestId: string,
  method: string,
  path: string
) => ({
  level,
  message,
  method,
  path,
  requestId,
  [Symbol.for('level')]: level,
  [Symbol.for('message')]: expect.any(String),
  timestamp: expect.any(String),
});

vi.mock('stack-trace', () => ({
  get: vi.fn(),
}));

describe('Logger', () => {
  let logger: Logger;

  beforeAll(() => {
    vi.spyOn(httpContext, 'get').mockReturnValue('request-id');
    (get as Mock).mockReturnValue([
      {},
      {},
      {},
      {
        getFileName: () => 'path',
        getFunctionName: () => 'functionName',
      },
    ]);
  });

  it('should create console transport for DEV environment', () => {
    logger = new Logger('DEV');
    expect(logger.logger.transports).toHaveLength(1);
    expect(logger.logger.transports[0]).toBeInstanceOf(transports.Console);
  });

  it('should create console and daily rotate file for PROD environment', () => {
    logger = new Logger('PROD');
    expect(logger.logger.transports).toHaveLength(2);
    expect(logger.logger.transports[0]).toBeInstanceOf(transports.Console);
    expect(logger.logger.transports[1]).toBeInstanceOf(
      transports.DailyRotateFile
    );
  });

  it('should have debug level for DEV environment', () => {
    logger = new Logger('DEV');
    expect(logger.logger.level).toEqual('debug');
  });

  it('should have info level for PROD environment', () => {
    logger = new Logger('PROD');
    expect(logger.logger.level).toEqual('info');
  });

  it('should log debug message', () => {
    logger = new Logger('DEV');
    const debugSpy = vi.spyOn(logger.logger, 'log');
    logger.debug('Debug message');
    expect(debugSpy).toHaveBeenCalledWith(
      'debug',
      logginMatch(
        'debug',
        'Debug message',
        'request-id',
        'functionName',
        'path'
      )
    );
  });

  it('should log error message', () => {
    logger = new Logger('DEV');
    const errorSpy = vi.spyOn(logger.logger, 'log');
    logger.error('Error message');
    expect(errorSpy).toHaveBeenCalledWith(
      'error',
      logginMatch(
        'error',
        'Error message',
        'request-id',
        'functionName',
        'path'
      )
    );
  });

  it('should log info message', () => {
    logger = new Logger('DEV');
    const infoSpy = vi.spyOn(logger.logger, 'log');
    logger.info('Info message');
    expect(infoSpy).toHaveBeenCalledWith(
      'info',
      logginMatch('info', 'Info message', 'request-id', 'functionName', 'path')
    );
  });

  it('should log warn message', () => {
    logger = new Logger('DEV');
    const warnSpy = vi.spyOn(logger.logger, 'log');
    logger.warn('Warn message');
    expect(warnSpy).toHaveBeenCalledWith(
      'warn',
      logginMatch('warn', 'Warn message', 'request-id', 'functionName', 'path')
    );
  });

  it('should log with unknown path and method if stack-trace.get throws an exception', () => {
    (get as Mock).mockImplementation(() => {
      throw new Error();
    });

    logger = new Logger('DEV');
    const logSpy = vi.spyOn(logger.logger, 'log');
    logger.debug('Debug message');
    expect(logSpy).toHaveBeenCalledWith(
      'debug',
      logginMatch('debug', 'Debug message', 'request-id', 'unknown', 'unknown')
    );
  });
});
