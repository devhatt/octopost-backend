import { AuthController } from '../controllers/auth-controller';
import type { Service } from '@/shared/protocols/service';
import { Validator } from '@/shared/infra/validator/validator';

export function authControllerFactory() {
  const validator = new Validator();
  const service = {} as Service;
  const authController = new AuthController(validator, service);
  return { authController };
}
