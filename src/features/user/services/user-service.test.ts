import { describe, expect, it, vi } from 'vitest';
import { UserService } from './user-service.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';

const makeSut = () => {
  const userRepository = {
    create: vi.fn(),
    findById: vi.fn(),
  };

  const accountRepository = {
    getAccounts: vi.fn(),
  };

  const userService = new UserService(userRepository, accountRepository);

  return { accountRepository, userRepository, userService };
};

describe('UserService', () => {
  it('should call userRepository.findById with correct id', async () => {
    const { userRepository, userService } = makeSut();
    const user = UserMock.create();

    userRepository.findById.mockResolvedValueOnce(null);

    const response = userService.execute(user);

    await expect(response).rejects.toThrowError('User not found');

    expect(userRepository.findById).toHaveBeenCalledWith(user.id);
  });

  it('should call accountRepository.getAccounts with correct user id', async () => {
    const { accountRepository, userRepository, userService } = makeSut();
    const user = UserMock.create();

    userRepository.findById.mockResolvedValueOnce(user);

    await userService.execute(user);

    expect(accountRepository.getAccounts).toHaveBeenCalledWith(user.id);
  });

  it('should throw an error if userRepository.findById returns null', async () => {
    const { userRepository, userService } = makeSut();
    const user = UserMock.create();
    userRepository.findById.mockResolvedValueOnce(null);

    const response = userService.execute(user);

    await expect(response).rejects.toThrowError('User not found');
  });

  it('should not throw an error if userRepository.findById returns a user', async () => {
    const { userRepository, userService } = makeSut();
    const user = UserMock.create();
    userRepository.findById.mockResolvedValueOnce(user);

    const response = userService.execute(user);

    await expect(response).resolves.not.toThrow();
  });
});
