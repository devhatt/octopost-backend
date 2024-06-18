import { Validator } from '@/shared/infra/validator/validator';
import type { Service } from '@/shared/protocols/service';

import { AuthController } from '../controllers/auth-controller';

export function authControllerFactory() {
  const validator = new Validator();
  const service = {} as Service;
  const authController = new AuthController(validator, service);
  return { authController };
}
