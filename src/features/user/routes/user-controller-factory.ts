import { UserController } from '../controllers/user-controller';
import { UserRepository } from '../repositories/user-repository/user-repository';
import { UserCreateService } from '../services/user-create-service';
import { Validator } from '@/shared/infra/validator/validator';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';

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
