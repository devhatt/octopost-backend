import { UserRepository } from './user-repository.js';
import { prisma } from 'mocks/prisma.js';
import { UserMock } from '@/shared/testHelpers/mocks/user.mock.js';

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

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: user,
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
});
