import { env } from 'src/config/env';

import { UserRepository } from '@/features/user/repositories/user-repository';
import { JWTHelper } from '@/shared/infra/jwt/jwt';

import { AuthenticationJWT } from './auth-jwt';

export function authJwtFactory() {
  const jwt = new JWTHelper(env.SECRET_KEY);
  const userRepository = new UserRepository();
  const authJwt = new AuthenticationJWT(jwt, userRepository);

  return { authJwt };
}
