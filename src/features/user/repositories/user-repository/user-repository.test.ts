import { UserRepository } from './user-repository.js';
import { prisma } from 'mocks/prisma.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';

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

      const expectedResult = {
        createdAt: new Date(),
        deletedAt: null,
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
        updatedAt: new Date(),
        username: user.username,
      };

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

  describe('findByUsernameOrEmail', () => {
    it('return user if found', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      const expectedResult = {
        createdAt: new Date(),
        deletedAt: null,
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
        updatedAt: new Date(),
        username: user.username,
      };

      prisma.user.findFirst.mockResolvedValue(expectedResult);

      const result = await repository.findByUsernameOrEmail(
        user.username,
        user.email
      );

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        select: expect.anything(),
        where: {
          email: user.email,
          username: user.username,
        },
      });

      expect(result).toEqual(expectedResult);
    });

    it('return null if user is not found', async () => {
      const { repository } = makeSut();

      prisma.user.findFirst.mockResolvedValue(null);

      const result = await repository.findByUsernameOrEmail(
        'non_existent_username',
        'non_existent_email'
      );

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        select: expect.anything(),
        where: {
          email: 'non_existent_email',
          username: 'non_existent_username',
        },
      });

      expect(result).toBeNull();
    });
  });
});
