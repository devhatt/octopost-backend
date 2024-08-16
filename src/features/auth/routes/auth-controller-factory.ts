/* istanbul ignore file -- @preserve */
import { env } from '@/config/env';

import { AuthController } from '@/features/auth/controllers/auth-controller';
import { AuthRepository } from '@/features/auth/repositories/auth-repository/auth-repository';
import { AuthLoginService } from '@/features/auth/services/auth-login-service';
import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';
import { JWTHelper } from '@/shared/infra/jwt/jwt';

export function authControllerFactory() {
  const authRepository = new AuthRepository();
  const jwt = new JWTHelper(env.SECRET_KEY);
  const crypto = new BcryptAdapter();

  const loginService = new AuthLoginService(authRepository, crypto, jwt);
  const authController = new AuthController(loginService);
  return { authController };
}
