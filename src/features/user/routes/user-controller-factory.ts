/* istanbul ignore file -- @preserve */
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';

import { UserController } from '../controllers/user-controller';
import { UserRepository } from '../repositories/user-repository';
import { UserCreateService } from '../services/user-create-service';
import { GetUserAccountsService } from '@/features/account/services/get-user-accounts-service';
import { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';

export function userControllerFactory() {
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository()
  const bcryptAdapter = new BcryptAdapter();
  const userServiceCreate = new UserCreateService(
    userRepository,
    bcryptAdapter
  );
  const userServiceFindById = new UserFindByIdService(userRepository);
  const getUserAccountsService = new GetUserAccountsService(userRepository, accountRepository)
  const userController = new UserController(
    userServiceCreate,
    userServiceFindById,
    getUserAccountsService
  );

  return { userController };
}
