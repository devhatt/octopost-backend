import type { UserRepository } from '@/features/user/repositories/user-repository';
import { InvalidTokenException } from '@/shared/errors/invalid-token-exception';
import { type JWTHelper } from '@/shared/infra/jwt/jwt';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

export class AuthenticationJWT {
  jwtAuth: AsyncRequestHandler = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token missing' });
      }

      const payload = this.jwtHelper.parseToken(token);

      const userId = payload.userId;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Invalid user' });
      }

      next();
    } catch (error) {
      if (error instanceof InvalidTokenException) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      console.error('Erro durante a autenticação:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  constructor(
    private jwtHelper: JWTHelper,
    private userRepository: UserRepository
  ) {}
}
