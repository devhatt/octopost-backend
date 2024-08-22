/* istanbul ignore file -- @preserve */
import { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import { GetUserAccountsService } from '@/features/account/services/get-user-accounts-service';
import { UserController } from '@/features/user/controllers/user-controller';
import { UserRepository } from '@/features/user/repositories/user-repository';
import { UserCreateService } from '@/features/user/services/user-create-service';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';

export function userControllerFactory() {
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository();
  const bcryptAdapter = new BcryptAdapter();
  const userServiceCreate = new UserCreateService(
    userRepository,
    bcryptAdapter
  );
  const userServiceFindById = new UserFindByIdService(userRepository);
  const getUserAccountsService = new GetUserAccountsService(
    userRepository,
    accountRepository
  );
  const userController = new UserController(
    userServiceCreate,
    userServiceFindById,
    getUserAccountsService
  );

  return { userController };
}
