import { configDotenv } from 'dotenv';
import { AuthenticationJWT } from './auth-jwt.js';
import { UserRepository } from '@/features/user/repositories/user-repository/user-repository.js';
import { JWTHelper } from '@/shared/infra/jwt/jwt.js';

configDotenv;

export function authJwtFactory() {
  const jwt = new JWTHelper(process.env.SECRET_KEY as string);
  const userRepository = new UserRepository();
  const authJwt = new AuthenticationJWT(jwt, userRepository);

  return { authJwt };
}
