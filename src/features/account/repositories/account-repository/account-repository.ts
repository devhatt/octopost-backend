import { database } from '@/shared/infra/database/database';

export class AccountRepository {
  create({
    avatarUrl,
    socialMediaId,
    userId,
  }: {
    avatarUrl: string;
    socialMediaId: number;
    userId: string;
  }) {
    return database.account.create({
      data: {
        avatarUrl,
        socialMediaId,
        userId,
      },
    });
  }

  async deleteAccountsBySocialMediaId(socialMediaId: number): Promise<void> {
    await database.account.deleteMany({
      where: {
        socialMediaId: socialMediaId,
      },
    });
  }

  findAccountsByUserId(id: string) {
    return database.account.findMany({
      select: {
        avatarUrl: true,
        id: true,
        socialMedia: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        userId: id,
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
