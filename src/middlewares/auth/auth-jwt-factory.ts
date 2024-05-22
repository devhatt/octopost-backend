import { AuthenticationJWT } from './auth-jwt.js';
import { UserRepository } from '@/features/user/repositories/user-repository/user-repository.js';
import { JWTHelper } from '@/shared/infra/jwt/jwt.js';
import env from 'src/config/env.js';

export function authJwtFactory() {
  const jwt = new JWTHelper(env.SECRET_KEY);
  const userRepository = new UserRepository();
  const authJwt = new AuthenticationJWT(jwt, userRepository);

  return { authJwt };
}
