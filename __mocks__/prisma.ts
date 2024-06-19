/* eslint-disable import/no-default-export */
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import { vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

export const prisma = mockDeep<PrismaClientType>();

export const PrismaClient = vi.fn(() => prisma);

export default { PrismaClient };
