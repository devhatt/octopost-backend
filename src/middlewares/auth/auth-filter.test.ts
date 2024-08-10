/* eslint-disable simple-import-sort/imports */
import { describe, expect, it } from 'vitest';

import {
  mockJwtAuth,
  mockNext,
  mockRequest,
  mockResponse,
} from '@/shared/test-helpers/mocks/auth.mock';
import { authFilter } from '@/middlewares/auth/auth-filter';

describe('authFilter middleware', () => {
  it('calls next for public routes', () => {
    const req = mockRequest('/api/users');
    const res = mockResponse();

    authFilter(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockJwtAuth).not.toHaveBeenCalled();
  });

  it('calls authJwt.jwtAuth for protected routes', () => {
    const req = mockRequest('/api/protected');
    const res = mockResponse();

    authFilter(req, res, mockNext);
    expect(mockJwtAuth).toHaveBeenCalled();
  });
});
