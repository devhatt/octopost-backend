import { UserRepository } from './user-repository.js';
import { prisma } from 'mocks/prisma.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock.js';

const makeSut = () => {
  const repository = new UserRepository();

  return { repository };
};

describe('[Repositories] UserRepository', () => {
  describe('create', () => {
    it('should call service with correctly params', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      await repository.create(user);

      const { id, ...userWithoutId } = user;

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userWithoutId,
      });
    });

    it('should throw an error if an error occurs', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      prisma.user.create.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.create(user);

      await expect(response).rejects.toThrowError();
    });
  });

  describe('findById', () => {
    it('return user if found', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      const expectedResult = UserMock.findByID();

      prisma.user.findUnique.mockResolvedValue(expectedResult);

      const result = await repository.findById(user.id);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        select: expect.anything(),
        where: {
          id: user.id,
        },
      });

      expect(result).toEqual(expectedResult);
    });

    it('return null if user is not found', async () => {
      const { repository } = makeSut();

      prisma.user.findUnique.mockResolvedValue(null);

      const result = await repository.findById('non_existent_id');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        select: expect.anything(),
        where: {
          id: 'non_existent_id',
        },
      });

      expect(result).toBeNull();
    });
  });

  describe('getAccounts', () => {
    it('should return user accounts if found', async () => {
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

    it('should return an empty array if user accounts are not found', async () => {
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
});
