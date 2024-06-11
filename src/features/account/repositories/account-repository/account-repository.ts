import { database } from '@/shared/infra/database/database.js';

export class AccountRepository {
  async deleteAccountsBySocialMediaId(socialMediaId: number): Promise<void> {
    await database.account.deleteMany({
      where: {
        socialMediaId: socialMediaId,
      },
    });
  }

  async getAccounts(userId: string) {
    const userAccounts = await database.account.findMany({
      where: {
        userId: userId,
      },
    });

    return userAccounts;
  }
}
