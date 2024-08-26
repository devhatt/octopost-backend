import { mock } from 'vitest-mock-extended';

import type { UserRepository } from '@/features/user/repositories/user-repository';
import type { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';
import { bcryptAdapteMock } from '@/shared/test-helpers/mocks/bcryptAdapter.mock';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';

import { UserCreateService } from './user-create-service';

let userCreateService: UserCreateService;

let userRepository = mock<UserRepository>(userRepositoryMock);

let bcryptAdapter = mock<BcryptAdapter>(bcryptAdapteMock);

beforeEach(() => {
  userCreateService = new UserCreateService(userRepository, bcryptAdapter);
});

describe('UserCreateService', () => {
  it('should call userRepository with correct params', async () => {
    const repositorySpy = vi.spyOn(userRepository, 'create');

    vi.spyOn(bcryptAdapter, 'encrypt').mockResolvedValue('valid_password');

    await userCreateService.execute({
      email: 'valid_email@email.com',
      name: 'valid_name',
      password: 'valid_password',
      repeatPassword: 'valid_password',
      username: 'valid_username',
    });

    expect(repositorySpy).toHaveBeenCalledWith({
      email: 'valid_email@email.com',
      name: 'valid_name',
      password: 'valid_password',
      username: 'valid_username',
    });
  });

  it('should throw when userRepository throws', async () => {
    vi.spyOn(userRepository, 'create').mockRejectedValue(new Error('error'));

    const response = userCreateService.execute({
      email: 'valid_email@email.com',
      name: 'valid_name',
      password: 'valid_password',
      repeatPassword: 'valid_password',
      username: 'valid_username',
    });

    await expect(response).rejects.toThrowError();
  });

  it('should conflict when password and repeatPassword dont match', async () => {
    const response = userCreateService.execute({
      email: 'valid_email@email.com',
      name: 'valid_name',
      password: 'valid_password',
      repeatPassword: 'invalid_password',
      username: 'valid_username',
    });

    await expect(response).rejects.toThrowError();
  });
});
