import { Validator } from '@/shared/infra/validator/validator.js';
import { AccountRepository } from '../repositories/account-repository/account-repository.js';
import { DeleteUserAccountsService } from '../services/delete-user-accounts-service.js';
import { AccountController } from './account-controller.js';

export function accountControllerFactory() {
  const validator = new Validator();
  const accountRepository = new AccountRepository();
  const deleteAccountByIdService = new DeleteUserAccountsService(
    accountRepository
  );

  const accountController = new AccountController(
    validator,
    deleteAccountByIdService
  );

  return { accountController };
}
