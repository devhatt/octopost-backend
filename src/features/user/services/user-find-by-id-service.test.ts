import type { UserRepository } from '../repositories/user-repository/user-repository';
import { UserFindByIdService } from './user-find-by-id-service';

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
    updateIsActiveStatus(_: string): Promise<void> {
      throw new Error('Method not implemented.');
    }
  }

  const userRepository = new UserRepositoryStub();
  const userFindByIdService = new UserFindByIdService(userRepository);

  return { userFindByIdService, userRepository };
};

describe('UserFindByIdService', () => {
  it('returns user data if found', async () => {
    const { userFindByIdService, userRepository } = makeSut();

    const repositorySpy = vi.spyOn(userRepository, 'findById');

    const result = await userFindByIdService.execute({ id: 'valid_id' });

    expect(repositorySpy).toHaveBeenCalledWith('valid_id');
    expect(result).toEqual({
      email: 'valid_email@email.com',
      id: 'valid_id',
      name: 'valid_name',
      username: 'valid_username',
    });
  });

  it('throws error if repository fails', async () => {
    const { userFindByIdService, userRepository } = makeSut();

    vi.spyOn(userRepository, 'findById').mockImplementationOnce(async () => {
      throw new Error('error');
    });

    const response = userFindByIdService.execute({ id: 'valid_id' });

    await expect(response).rejects.toThrowError();
  });

  it('returns null if user not found', async () => {
    const { userFindByIdService, userRepository } = makeSut();

    vi.spyOn(userRepository, 'findById').mockImplementationOnce(
      async () => null
    );

    const result = await userFindByIdService.execute({ id: 'non_existent_id' });

    expect(result).toBeNull();
  });
});
