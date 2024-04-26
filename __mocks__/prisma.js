import { mockDeep } from 'vitest-mock-extended';
export const prisma = mockDeep();
export const PrismaClient = vi.fn(() => prisma);
export default { PrismaClient };
