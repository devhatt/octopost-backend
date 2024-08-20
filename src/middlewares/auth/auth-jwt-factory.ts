import { env } from 'src/config/env';

import { UserRepository } from '@/features/user/repositories/user-repository';
import { AuthenticationJWT } from '@/middlewares/auth/auth-jwt';
import { JWTHelper } from '@/shared/infra/jwt/jwt';

export function authJwtFactory() {
  const jwt = new JWTHelper(env.SECRET_KEY);
  const userRepository = new UserRepository();
  const authJwt = new AuthenticationJWT(jwt, userRepository);

  return { authJwt };
}
