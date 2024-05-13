import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
}

export class JWTHelper {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  createToken(token: TokenPayload, expiresIn: string = '1h'): string {
    return jwt.sign(token, this.secretKey, { expiresIn });
  }

  parseToken(token: string): null | TokenPayload {
    try {
      const payload = jwt.verify(token, this.secretKey) as TokenPayload;
      return payload;
    } catch {
      return null;
    }
  }

  refreshToken(token: string): Error | string {
    try {
      const payload = this.parseToken(token);
      if (!payload) return 'invalid token';
      return this.createToken(payload);
    } catch {
      const message = new Error('error creating token');
      return message;
    }
  }
}
