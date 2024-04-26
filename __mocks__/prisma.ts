import type { PrismaClient as PrismaClientType } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';

export const prisma = mockDeep<PrismaClientType>();

export const PrismaClient = vi.fn(() => prisma);

export default { PrismaClient };
