/* istanbul ignore file */

import { Validator } from '@/shared/infra/validator/validator.js';
import { UserController } from '../controllers/user-controller.js';
import { UserCreateService } from '../services/user-create-service.js';

export function userControllerFactory() {
  const userServiceFindAll = new UserCreateService();
  const validator = new Validator();
  const userController = new UserController(validator, userServiceFindAll);

  return { userController };
}
