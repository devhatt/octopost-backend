import type { Account } from '@prisma/client';
import { prisma } from 'mocks/prisma';

import { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import { database } from '@/shared/infra/database/database';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock';

describe('[Repositories] AccountRepository', () => {
  let repository: AccountRepository;
  let account: Account;

  beforeEach(() => {
    repository = new AccountRepository();
    account = AccountMock.create();
  });

  describe('getAccounts', () => {
    it('returns user accounts if found', async () => {
      const expectedResult = [
        {
          avatarUrl: account.avatarUrl,
          createdAt: new Date(),
          favorite: false,
          id: account.id,
          name: null,
          socialMediaId: account.socialMediaId,
          socialMediaUserId: null,
          updatedAt: new Date(),
          userId: account.userId,
          username: null,
        },
      ];

      prisma.account.findMany.mockResolvedValue(expectedResult);

      const result = await repository.getAccounts(account.userId!);

      expect(result[0]).toEqual(expectedResult[0]);
      expect(prisma.account.findMany).toHaveBeenCalledWith({
        where: {
          userId: account.userId,
        },
      });
    });

    it('returns an empty array if user accounts are not found', async () => {
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

  describe('Create', () => {
    it('creates an account', async () => {
      prisma.account.create.mockResolvedValue({
        avatarUrl: 'avatar-url',
        createdAt: account.createdAt,
        favorite: false,
        id: account.id,
        name: 'account-name',
        socialMediaId: 1,
        socialMediaUserId: 'social-media-user-id',
        updatedAt: account.updatedAt,
        userId: 'account-id',
        username: 'account-social-media-username',
      });

      const result = await repository.create({
        avatarUrl: 'avatar-url',
        socialMediaId: 1,
        socialMediaUserId: 'social-media-user-id',
        userId: 'account-id',
      });

      expect(result).toEqual({
        avatarUrl: 'avatar-url',
        createdAt: expect.any(Date),
        favorite: false,
        id: account.id,
        name: 'account-name',
        socialMediaId: 1,
        socialMediaUserId: 'social-media-user-id',
        updatedAt: expect.any(Date),
        userId: 'account-id',
        username: 'account-social-media-username',
      });
    });
  });

  describe('findAccountByUser', () => {
    it('returns an account if found', async () => {
      prisma.account.findMany.mockResolvedValue([
        {
          avatarUrl: 'avatar-url',
          createdAt: new Date(),
          favorite: false,
          id: 'account-id',
          name: null,
          socialMediaId: 1,
          socialMediaUserId: null,
          updatedAt: new Date(),
          userId: 'account-user-id',
          username: null,
        },
      ]);

      const result = await repository.findAccountsByUserId(account.userId!);

      expect(result).toEqual([
        {
          avatarUrl: 'avatar-url',
          createdAt: expect.any(Date),
          favorite: false,
          id: 'account-id',
          name: null,
          socialMediaId: 1,
          socialMediaUserId: null,
          updatedAt: expect.any(Date),
          userId: 'account-user-id',
          username: null,
        },
      ]);
    });

    it('returns null if account is not found', async () => {
      const userId = 'non_existent_user_id';

      prisma.account.findMany.mockResolvedValue([]);

      const result = await repository.findAccountsByUserId(userId);

      expect(result).toStrictEqual([]);
    });
  });
});
