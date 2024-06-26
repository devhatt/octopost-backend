import jwt from 'jsonwebtoken';

import { InvalidTokenException } from '@/shared/errors/invalid-token-exception';

export interface TokenPayload {
  userId: string;
}

export class JWTHelper {
  constructor(private readonly secretKey: string) {}

  createToken(token: TokenPayload, expiresIn: string = '1h'): string {
    return jwt.sign(token, this.secretKey, { expiresIn });
  }

  parseToken(token: string): Error | TokenPayload {
    try {
      const payload = jwt.verify(token, this.secretKey) as TokenPayload;
      return payload;
    } catch (error) {
      const err = error as InvalidTokenException;
      throw new InvalidTokenException('Invalid token ' + err.message);
    }
  }

  refreshToken(token: string): Error | string {
    try {
      const payload = this.parseToken(token);
      return jwt.sign(payload, this.secretKey);
    } catch (error) {
      const err = error as InvalidTokenException;
      return 'Invalid token: ' + err.message;
    }
  }
}
