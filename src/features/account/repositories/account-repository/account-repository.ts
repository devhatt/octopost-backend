import { database } from '@/shared/infra/database/database.js';

export class AccountRepository {
  async getAccounts(userId: string) {
    const userAccounts = await database.account.findMany({
      where: {
        userId: userId,
      },
    });

    return userAccounts;
  }
}
