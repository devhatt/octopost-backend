import { AuthController } from '../controllers/auth-controller';

export function authControllerFactory() {
  const authController = new AuthController(undefined);
  return { authController };
}
