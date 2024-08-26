import { vi } from 'vitest';

export const userRepositoryMock = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  findById: vi.fn(),
  updateIsActiveStatus: vi.fn(),
};
