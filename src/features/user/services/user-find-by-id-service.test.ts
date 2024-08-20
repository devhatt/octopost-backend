import { mock } from 'vitest-mock-extended';

import type { UserRepository } from '@/features/user/repositories/user-repository';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

describe('UserFindByIdService', () => {
  let userFindByIdService: UserFindByIdService;
  const userRepository = mock<UserRepository>(userRepositoryMock);

  beforeEach(() => {
    userFindByIdService = new UserFindByIdService(userRepository);
  });

  it('returns user data if found', async () => {
    const userMock = UserMock.create({
      email: 'valid_email@email.com',
      id: 'valid_id',
      name: 'valid_name',
      username: 'valid_username',
    });

    userRepository.findById.mockResolvedValue(userMock);

    const { user } = await userFindByIdService.execute({ id: 'valid_id' });

    expect(user).toEqual(userMock);
  });

  it('throws error if repository fails', async () => {
    vi.spyOn(userRepository, 'findById').mockRejectedValue(
      new Error('User not found')
    );

    const response = userFindByIdService.execute({ id: 'valid_id' });

    await expect(response).rejects.toThrowError();
  });
});
