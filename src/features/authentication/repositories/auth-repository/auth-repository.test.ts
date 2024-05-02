import { AuthRepository } from './auth-repository.js';
import { prisma } from 'mocks/prisma.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';
import { UserRepository } from '@/features/user/repositories/user-repository/user-repository.js';

const makeSut = () => {
  const repository = new AuthRepository();
  const userRepository = new UserRepository();

  return { repository, userRepository };
};

describe('[Repositories] AuthRepository', () => {
  describe('findPasswordByUsername', () => {
    it('should call service with correctly params', async () => {
      const { repository } = makeSut();
      const user = UserMock.create();

      await repository.findPasswordByUsername(user.username);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: user.username },
      });
    });
    it('should return an object with correct password', async () => {
      const { repository } = makeSut();
      const user = UserMock.create();

      prisma.user.findUnique.mockResolvedValue({
        createdAt: new Date(),
        deletedAt: null,
        email: user.email,
        id: '1',
        name: user.name,
        password: user.password,
        updatedAt: new Date(),
        username: user.username,
      });

      const password = await repository.findPasswordByUsername(user.username);

      expect(password.password).toBe(user.password);
    });

    it('should throw an error if an error occurs', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      prisma.user.findUnique.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.findPasswordByUsername(user.username);

      await expect(response).rejects.toThrowError();
    });
  });

  describe('findUserByUsername', () => {
    it('should call service with correctly params', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      await repository.findUserByUsername(user.username);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: user.username },
      });
    });

    it('should throw an error if an error occurs', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      prisma.user.findUnique.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.findPasswordByUsername(user.username);

      await expect(response).rejects.toThrowError();
    });
  });
});
