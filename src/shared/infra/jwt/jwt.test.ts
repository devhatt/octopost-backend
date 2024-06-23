import type { TokenPayload } from './jwt';
import { JWTHelper } from './jwt';

describe('JWTHelper', () => {
  const secretKey = '123';
  const jwt = new JWTHelper(secretKey);
  const payload = { userId: '0321' };

  describe('createToken', () => {
    it('should create a valid token', () => {
      const token = jwt.createToken(payload);

      expect(token).toBeTruthy();
    });
  });

  describe('refreshToken', () => {
    const token = jwt.createToken(payload);

    it('should refresh token', () => {
      const newToken = jwt.refreshToken(token);
      const exist = newToken ? true : false;

      expect(exist).toBeTruthy();
    });

    it('should not refresh an invalid token', () => {
      const newToken = jwt.refreshToken('invalidToken');

      expect(newToken).toBe('invalid token');
    });
  });

  describe('parseToken', () => {
    it('should parse a valid token', () => {
      const token = jwt.createToken(payload);
      const parsedPayload = jwt.parseToken(token) as TokenPayload;

      expect(parsedPayload?.userId).toBe(payload.userId);
    });

    it('should return error for an invalid token', () => {
      const invalidToken = 'invalidToken';
      const parsedPayload = jwt.parseToken(invalidToken);
      const error = new Error('Invalid token');

      expect(parsedPayload).toEqual(error);
    });
  });
});
