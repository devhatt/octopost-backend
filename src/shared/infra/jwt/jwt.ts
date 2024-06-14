import jwt from 'jsonwebtoken';

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
    } catch {
      return new Error('Invalid token');
    }
  }

  refreshToken(token: string): string {
    const payload = this.parseToken(token);
    if (payload instanceof Error) return 'invalid token';
    return jwt.sign(payload, this.secretKey);
  }
}
