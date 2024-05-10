/* istanbul ignore file -- @preserve */

import { UserController } from '../controllers/user-controller.js';
import { UserRepository } from '../repositories/user-repository/user-repository.js';
import { UserCreateService } from '../services/user-create-service.js';
import { Validator } from '@/shared/infra/validator/validator.js';

export function userControllerFactory() {
  const userRepository = new UserRepository();
  const userService = new UserCreateService(userRepository);
  const validator = new Validator();
  const userController = new UserController(validator, userService);

  return { userController };
}
