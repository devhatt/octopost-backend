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

  async softDeleteAccountsBySocialMediaId(
    socialMediaId: number
  ): Promise<void> {
    await database.account.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        socialMediaId: socialMediaId,
      },
    });
  }
}
