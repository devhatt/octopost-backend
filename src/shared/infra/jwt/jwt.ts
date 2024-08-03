import jwt from 'jsonwebtoken';

import { InvalidTokenException } from '@/shared/errors/invalid-token-exception';

export interface TokenPayload {
  name: string;
  userId: string;
  username: string;
}

export class JWTHelper {
  constructor(private readonly secretKey: string) {}

  createToken(payload: TokenPayload, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  parseToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, this.secretKey) as TokenPayload;

      return payload;
    } catch (error) {
      const err = error as InvalidTokenException;
      throw new InvalidTokenException('Invalid token ' + err.message);
    }
  }

  refreshToken(token: string): string {
    try {
      const payload = this.parseToken(token);
      return jwt.sign(payload, this.secretKey);
    } catch (error) {
      const err = error as InvalidTokenException;
      return 'Invalid token: ' + err.message;
    }
  }
}
