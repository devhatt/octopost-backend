import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { UserCreateService } from './user-create-service.js';

const makeSut = () => {
  class UserRepositoryStub implements UserRepository {
    create({ email, name, password, username }: any) {
      return Promise.resolve({
        createdAt: new Date(2024, 5, 1),
        deletedAt: null,
        email,
        id: 'valid_id',
        name,
        password,
        updatedAt: new Date(2024, 5, 1),
        username,
      });
    }

    findById(id: string): Promise<{
      email: string;
      id: string;
      name: null | string;
      username: string;
    } | null> {
      throw new Error('Method not implemented. ' + id);
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
    const { userCreateService, userRepository } = makeSut();

    vi.spyOn(userRepository, 'create').mockImplementationOnce(async () => {
      throw new Error('error');
    });

    const response = userCreateService.execute({
      email: 'valid_email@email.com',
      name: 'valid_name',
      password: 'valid_password',
      repeatPassword: 'valid_password',
      username: 'valid_username',
    });

    await expect(response).rejects.toThrowError();
  });
});
