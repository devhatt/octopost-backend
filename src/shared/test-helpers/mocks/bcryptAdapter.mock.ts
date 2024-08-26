import { vi } from 'vitest';

export const bcryptAdapteMock = {
  compare: vi.fn(),
  encrypt: vi.fn(),
};
