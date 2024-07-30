import { vi } from 'vitest';

export const accountRepositoryMock = {
  create: vi.fn(),
  deleteAccountsBySocialMediaId: vi.fn(),
  findAccountsByUserId: vi.fn(),
  getAccountBySocialMedia: vi.fn(),
  getAccounts: vi.fn(),
};
