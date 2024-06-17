import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserRepository } from './user-repository';
import { prisma } from 'mocks/prisma';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';
import { ConflictError } from '@/shared/errors/conflict-error';

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
      const expectedFinalError = new ConflictError(
        'There is already a user with this email or username'
      );
      const userAlreadyExistsError = new PrismaClientKnownRequestError(
        'There is already a user with this email or username',
        {
          clientVersion: '5.13.0',
          code: 'P2002',
        }
      );
      const user = UserMock.create();

      prisma.user.create.mockImplementationOnce(() => {
        throw userAlreadyExistsError;
      });

      try {
        await repository.create(user);
        // fail('Expected error to be thrown');
      } catch (error: any) {
        expect(error.message).toBe(expectedFinalError.message);
      }
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

  describe('updateIsActiveStatus', () => {
    it('should call service with correctly params', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      await repository.updateIsActiveStatus(user.id);

      expect(prisma.user.update).toHaveBeenCalledWith({
        data: {
          isActive: true,
        },
        where: {
          id: user.id,
        },
      });
    });

    it('should throw an error if an error occurs', async () => {
      const { repository } = makeSut();

      const user = UserMock.create();

      prisma.user.update.mockImplementationOnce(() => {
        throw new Error('error');
      });

      const response = repository.updateIsActiveStatus(user.id);

      await expect(response).rejects.toThrowError();
    });
  });
});
