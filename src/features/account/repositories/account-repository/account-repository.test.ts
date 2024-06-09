import { AccountRepository } from './account-repository.js';
import { prisma } from 'mocks/prisma.js';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock.js';
import { database } from '@/shared/infra/database/database.js';

const makeSut = () => {
  const repository = new AccountRepository();

  return { repository };
};

describe('[Repositories] AccountRepository', () => {
  describe('getAccounts', () => {
    it('returns user accounts if found', async () => {
      const { repository } = makeSut();

      const account = AccountMock.create();

      const expectedResult = [
        {
          avatarUrl: account.avatarUrl,
          createdAt: new Date(),
          id: account.id,
          socialMediaId: account.socialMediaId,
          updatedAt: new Date(),
          userId: account.userId,
        },
      ];

      prisma.account.findMany.mockResolvedValue(expectedResult);

      const result = await repository.getAccounts(account.userId);

      expect(result[0]).toEqual(expectedResult[0]);
      expect(prisma.account.findMany).toHaveBeenCalledWith({
        where: {
          userId: account.userId,
        },
      });
    });

    it('returns an empty array if user accounts are not found', async () => {
      const { repository } = makeSut();

      const userId = 'non_existent_user_id';

      prisma.account.findMany.mockResolvedValue([]);

      const result = await repository.getAccounts(userId);

      expect(result).toEqual([]);
      expect(prisma.account.findMany).toHaveBeenCalledWith({
        where: {
          userId: userId,
        },
      });
    });
  });

  describe('deleteAccountsBySocialMediaId', () => {
    it('deletes accounts associated with the given social media id', async () => {
      const { repository } = makeSut();

      const socialMediaId = 123;

      const expectedResult = {
        count: 2,
      };

      database.account.deleteMany = vi.fn().mockResolvedValue(expectedResult);

      await repository.deleteAccountsBySocialMediaId(socialMediaId);

      expect(database.account.deleteMany).toHaveBeenCalledWith({
        where: {
          socialMediaId: socialMediaId,
        },
      });

      expect(database.account.deleteMany).toHaveBeenCalledTimes(1);
    });
  });
});
