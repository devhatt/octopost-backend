import { AuthRepository } from './auth-repository.js';
import { prisma } from 'mocks/prisma.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';

const makeSut = () => {
  const repository = new AuthRepository();

  return { repository };
};

describe('[Repositories] AuthRepository', () => {
  describe('findUserByCredentials', () => {
    it('should call service with correctly params', async () => {
      const { repository } = makeSut();
      const user = UserMock.create();

      await repository.findUserByCredentials({
        password: user.password,
        username: user.username,
      });

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { password: user.password, username: user.username },
      });
    });
    it('should return an object with user without password', async () => {
      const { repository } = makeSut();
      const user = UserMock.create();

      prisma.user.findFirst.mockResolvedValue({
        createdAt: new Date(),
        deletedAt: null,
        email: user.email,
        id: '1',
        name: user.name,
        password: user.password,
        updatedAt: new Date(),
        username: user.username,
      });

      const userData = await repository.findUserByCredentials({
        password: user.password,
        username: user.username,
      });

      const expectedUser = {
        email: user.email,
        id: '1',
        name: user.name,
        username: user.username,
      };

      expect(expectedUser).toMatchObject(userData);
    });

    it('should throw an error if an error occurs', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      prisma.user.findFirst.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.findUserByCredentials({
        password: user.password,
        username: user.username,
      });

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

    it('should return an object with user without password', async () => {
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

      const userData = await repository.findUserByUsername(user.username);

      const expectedUser = {
        email: user.email,
        id: '1',
        name: user.name,
        username: user.username,
      };

      expect(expectedUser).toMatchObject(userData);
    });

    it('should throw an error if an error occurs', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      prisma.user.findUnique.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.findUserByUsername(user.username);

      await expect(response).rejects.toThrowError();
    });
  });
});
