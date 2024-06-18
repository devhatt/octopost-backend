import { database } from '@/shared/infra/database/database';

export class AccountRepository {
  async deleteAccountsBySocialMediaId(socialMediaId: number): Promise<void> {
    await database.account.deleteMany({
      where: {
        socialMediaId: socialMediaId,
      },
    });
  }

  getAccounts(userId: string) {
    return database.account.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
