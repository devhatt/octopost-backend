import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { UserFindByIdService } from './user-find-by-id-service.js';

const makeSut = () => {
  class UserRepositoryStub implements UserRepository {
    create({ email, name, password, username }: any): Promise<any> {
      throw new Error(
        'Method not implemented. ' + email + name + password + username
      );
    }

    findById(id: string): Promise<{
      email: string;
      id: string;
      name: null | string;
      username: string;
    } | null> {
      return Promise.resolve({
        email: 'valid_email@email.com',
        id,
        name: 'valid_name',
        username: 'valid_username',
      });
    }
  }

  const userRepository = new UserRepositoryStub();
  const userFindByIdService = new UserFindByIdService(userRepository);

  return { userFindByIdService, userRepository };
};

describe('UserFindByIdService', () => {
  it('call userRepository with correct params', async () => {
    const { userFindByIdService, userRepository } = makeSut();

    const repositorySpy = vi.spyOn(userRepository, 'findById');

    await userFindByIdService.execute('valid_id');

    expect(repositorySpy).toHaveBeenCalledWith('valid_id');
  });

  it('throw error when userRepository.findById fails', async () => {
    const { userFindByIdService, userRepository } = makeSut();

    vi.spyOn(userRepository, 'findById').mockImplementationOnce(async () => {
      throw new Error('error');
    });

    const response = userFindByIdService.execute('valid_id');

    await expect(response).rejects.toThrowError();
  });

  it('return user data correctly', async () => {
    const { userFindByIdService } = makeSut();

    const result = await userFindByIdService.execute('valid_id');

    expect(result).toEqual({
      email: 'valid_email@email.com',
      id: 'valid_id',
      name: 'valid_name',
      username: 'valid_username',
    });
  });

  it('return null if user not found', async () => {
    const { userFindByIdService, userRepository } = makeSut();

    vi.spyOn(userRepository, 'findById').mockImplementationOnce(
      async () => null
    );

    const result = await userFindByIdService.execute('non_existent_id');

    expect(result).toBeNull();
  });
});
