import mockedPrisma from 'mocks/prisma.js';

vi.mock('@prisma/client', () => mockedPrisma);

afterEach(() => {
  vi.clearAllMocks();
});
