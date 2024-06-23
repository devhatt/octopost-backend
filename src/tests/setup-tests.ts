/* eslint-disable no-undef */
import mockedPrisma from 'mocks/prisma';

vi.mock('@prisma/client', () => mockedPrisma);

afterEach(() => {
  vi.clearAllMocks();
});
