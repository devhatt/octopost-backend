import { AuthenticationJWT } from './auth-jwt';
import { UserRepository } from '@/features/user/repositories/user-repository/user-repository';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { env } from 'src/config/env';

export function authJwtFactory() {
  const jwt = new JWTHelper(env.SECRET_KEY);
  const userRepository = new UserRepository();
  const authJwt = new AuthenticationJWT(jwt, userRepository);

  return { authJwt };
}
