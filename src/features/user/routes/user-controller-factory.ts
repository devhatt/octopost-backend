import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';

import { UserController } from '../controllers/user-controller';
import { UserRepository } from '../repositories/user-repository';
import { UserCreateService } from '../services/user-create-service';

export function userControllerFactory() {
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter();
  const userServiceCreate = new UserCreateService(
    userRepository,
    bcryptAdapter
  );
  const userServiceFindById = new UserFindByIdService(userRepository);
  const userController = new UserController(
    userServiceCreate,
    userServiceFindById
  );

  return { userController };
}
