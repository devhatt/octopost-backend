import type { NextFunction, Request, Response } from 'express';
import type { UserRepository } from '@/features/user/repositories/user-repository/user-repository.js';
import type { JWTHelper } from '@/shared/infra/jwt/jwt.js';

export class AuthenticationJWT {
  constructor(
    private jwtHelper: JWTHelper,
    private userRepository: UserRepository
  ) {}

  async jwtAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token missing' });
      }

      const payload = this.jwtHelper.parseToken(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const userId = payload.userId;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Invalid user' });
      }

      next();
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
