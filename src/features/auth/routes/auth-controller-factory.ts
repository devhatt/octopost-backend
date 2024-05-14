/* istanbul ignore file -- @preserve */

import { AuthController } from '../controllers/auth-controller.js';
import type { Service } from '@/shared/protocols/service.js';
import { Validator } from '@/shared/infra/validator/validator.js';

export function authControllerFactory() {
  const validator = new Validator();
  const service = {} as Service;
  const authController = new AuthController(validator, service);
  return { authController };
}
