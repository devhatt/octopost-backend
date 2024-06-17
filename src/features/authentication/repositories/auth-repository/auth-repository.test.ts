import { AuthRepository } from './auth-repository';
import { prisma } from 'mocks/prisma';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

const makeSut = () => {
  const repository = new AuthRepository();
  const user = UserMock.create();
  return { repository, user };
};

describe('[Repositories] AuthRepository', () => {
  describe('findUserByCredentials', () => {
    it('should call service with correctly params', async () => {
      const { repository, user } = makeSut();

      await repository.findUserByCredentials({
        password: user.password,
        username: user.username,
      });

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        select: {
          email: true,
          id: true,
          name: true,
          username: true,
        },
        where: { password: user.password, username: user.username },
      });
    });
    it('should return an object with user without password', async () => {
      const { repository, user } = makeSut();
      const expectedUser = UserMock.findByID();

      prisma.user.findFirst.mockResolvedValue(expectedUser);

      const userData = await repository.findUserByCredentials({
        password: user.password,
        username: user.username,
      });

      expect(expectedUser).toStrictEqual(userData);
    });

    it('should throw an error if an error occurs', async () => {
      const { repository, user } = makeSut();

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
      const { repository, user } = makeSut();

      await repository.findUserByUsername(user.username);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        select: {
          email: true,
          id: true,
          name: true,
          username: true,
        },
        where: { username: user.username },
      });
    });

    it('should return an object with user without password', async () => {
      const { repository, user } = makeSut();
      const expectedUser = UserMock.findByID();

      prisma.user.findUnique.mockResolvedValueOnce(expectedUser);

      const userData = await repository.findUserByUsername(user.username);

      expect(expectedUser).toStrictEqual(userData);
    });

    it('should throw an error if an error occurs', async () => {
      const { repository, user } = makeSut();

      prisma.user.findUnique.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.findUserByUsername(user.username);

      await expect(response).rejects.toThrowError();
    });
  });
});
