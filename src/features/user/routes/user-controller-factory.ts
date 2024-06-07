import { UserController } from '../controllers/user-controller.js';
import { UserRepository } from '../repositories/user-repository/user-repository.js';
import { UserCreateService } from '../services/user-create-service.js';
import { Validator } from '@/shared/infra/validator/validator.js';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service.js';
import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter.js';

export function userControllerFactory() {
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter();
  const userServiceCreate = new UserCreateService(
    userRepository,
    bcryptAdapter
  );
  const userServiceFindById = new UserFindByIdService(userRepository);
  const validator = new Validator();
  const userController = new UserController(
    validator,
    userServiceCreate,
    userServiceFindById
  );

  return { userController };
}
