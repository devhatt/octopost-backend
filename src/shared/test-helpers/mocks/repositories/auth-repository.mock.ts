import { vi } from 'vitest';

export const authRepositoryMock = {
  findUserByCredentials: vi.fn(),
  findUserByUsername: vi.fn(),
};
