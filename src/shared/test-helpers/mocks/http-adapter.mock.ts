import { vi } from 'vitest';

export const httpAdapterMock = {
  get: vi.fn(),
  post: vi.fn(),
};
