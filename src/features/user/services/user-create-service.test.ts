import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { UserCreateService } from './user-create-service.js';

const makeSut = () => {
  class UserRepositoryStub implements UserRepository {
    create({ email, password }: any) {
      return Promise.resolve({
        email,
        id: 'valid_id',
        password,
      });
    }
  }

  const userRepository = new UserRepositoryStub();

  const userCreateService = new UserCreateService(userRepository);

  return { userCreateService, userRepository };
};

describe('UserCreateService', () => {
  it('should call userRepository with correct params', async () => {
    const { userCreateService, userRepository } = makeSut();

    const repositorySpy = vi.spyOn(userRepository, 'create');

    await userCreateService.execute({
      email: 'valid_email@email.com',
      password: 'valid_password',
    });

    expect(repositorySpy).toHaveBeenCalledWith({
      email: 'valid_email@email.com',
      password: 'valid_password',
    });
  });

  it('should throw when userRepository throws', async () => {
    const { userCreateService, userRepository } = makeSut();

    vi.spyOn(userRepository, 'create').mockImplementationOnce(async () => {
      throw new Error('error');
    });

    const response = userCreateService.execute({
      email: 'valid_email@email.com',
      password: 'valid_password',
    });

    await expect(response).rejects.toThrowError();
  });
});
