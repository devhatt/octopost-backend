import { PrismaClient } from '@prisma/client';

const database = new PrismaClient({
  log: ['info', 'warn', 'query', 'error'],
});

export { database };
