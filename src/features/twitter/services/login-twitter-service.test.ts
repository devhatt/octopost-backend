import jwt from 'jsonwebtoken';
import type { Mock } from 'vitest';

import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';

import { LoginTwitterService } from './login-twitter-service';

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(() => ({ userId: '123' })),
  },
}));

describe('LoginTwitterService', () => {
  let sut: LoginTwitterService;
  let mockVerify: Mock;
  const jsonwebtoken = jwt;

  beforeEach(() => {
    sut = new LoginTwitterService({
      secretKey: 'secret_key',
    });
    mockVerify = vi.fn(() => ({ userId: `123` }));
    jsonwebtoken.verify = mockVerify;
  });

  it('should return the generated auth URL', () => {
    const authorization = 'Bearer token';
    const result = sut.execute({ authorization });

    expect(mockVerify).toHaveBeenCalledWith('token', 'secret_key');
    expect(result).toContain('https://twitter.com/i/oauth2/authorize');
  });

  it('should throw an error if authorization header is missing', () => {
    expect(() => sut.execute({ authorization: '' })).toThrow('Unauthorized');
  });

  it('should throw an error if invalid token', () => {
    vi.spyOn(JWTHelper.prototype, 'parseToken').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const authorization = `Bearer invalid_token`;

    expect(() => sut.execute({ authorization })).toThrow(
      InvalidCredentialsError
    );
  });
});
