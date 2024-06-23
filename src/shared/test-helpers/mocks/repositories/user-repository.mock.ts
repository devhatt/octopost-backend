import { vi } from 'vitest';

export const userRepositoryMock = {
  create: vi.fn(),
  findById: vi.fn(),
  updateIsActiveStatus: vi.fn(),
};
