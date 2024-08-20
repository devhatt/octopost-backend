import { AccountController } from '@/features/account/controllers/account-controller';
import { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import { DeleteUserAccountsService } from '@/features/account/services/delete-user-accounts-service';

export function accountControllerFactory() {
  const accountRepository = new AccountRepository();

  const deleteAccountByIdService = new DeleteUserAccountsService(
    accountRepository
  );

  const accountController = new AccountController(deleteAccountByIdService);

  return { accountController };
}
