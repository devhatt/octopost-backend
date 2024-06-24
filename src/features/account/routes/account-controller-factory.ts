import { AccountController } from '../controllers/account-controller';
import { AccountRepository } from '../repositories/account-repository/account-repository';
import { DeleteUserAccountsService } from '../services/delete-user-accounts-service';

export function accountControllerFactory() {
  const accountRepository = new AccountRepository();

  const deleteAccountByIdService = new DeleteUserAccountsService(
    accountRepository
  );

  const accountController = new AccountController(deleteAccountByIdService);

  return { accountController };
}
