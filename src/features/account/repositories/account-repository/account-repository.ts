import { database } from '@/shared/infra/database/database';

export class AccountRepository {
  create({
    avatarUrl,
    socialMediaId,
    socialMediaUserId,
    userId,
  }: {
    avatarUrl: string;
    socialMediaId: number;
    socialMediaUserId: string;
    userId: string;
  }) {
    return database.account.create({
      data: {
        avatarUrl,
        favorite: false,
        socialMediaId,
        socialMediaUserId,
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

  getAccountBySocialMedia({
    socialMediaUserId,
    userId,
  }: {
    socialMediaUserId: string;
    userId: string;
  }) {
    return database.account.findFirst({
      where: {
        socialMediaUserId,
        userId,
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
