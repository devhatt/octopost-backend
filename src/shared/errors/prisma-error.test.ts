import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { prismaErrorHandler } from './prisma-error';

describe('[ERROR] Prisma Error Handler', () => {
  it('P2002', () => {
    const error = new PrismaClientKnownRequestError('', {
      clientVersion: '3.0.0',
      code: 'P2002',
    });

    expect(() => prismaErrorHandler(error)).toThrowError();
  });
});
