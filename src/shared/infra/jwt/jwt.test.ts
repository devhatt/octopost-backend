import { JWTHelper } from './jwt.js';

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
    it('should refresh token', () => {
      const token = jwt.createToken(payload);
      const newToken = jwt.refreshToken(token);
      const exist = newToken ? true : false;

      expect(exist).toBeTruthy();
      expect(newToken).not.toBe(token);
    });

    it('should not refresh an invalid token', () => {
      const invalidToken = 'invalidToken';
      const newToken = jwt.refreshToken(invalidToken);

      expect(newToken).toBe('invalid token');
    });
  });

  describe('parseToken', () => {
    it('should parse a valid token', () => {
      const token = jwt.createToken(payload);
      const parsedPayload = jwt.parseToken(token);

      expect(parsedPayload?.userId).toContain(payload.userId);
    });

    it('should return null for an invalid token', () => {
      const invalidToken = 'invalidToken';
      const parsedPayload = jwt.parseToken(invalidToken);

      expect(parsedPayload).toBeNull();
    });
  });
});
