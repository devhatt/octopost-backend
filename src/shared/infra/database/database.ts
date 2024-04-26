/* istanbul ignore file -- @preserve */

import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

export { database };
