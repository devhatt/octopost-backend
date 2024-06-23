import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter';
import { JWTHelper } from '@/shared/infra/jwt/jwt';

import type { AuthRepository } from '../repositories/auth-repository/auth-repository.js';
import { AuthLoginService } from './auth-login-service';

const makeSut = () => {
  class AuthRepositoryStub implements AuthRepository {
    findUserByCredentials({
      password,
      username,
    }: {
      password: string;
      username: string;
    }): Promise<{
      email: string;
      id: string;
      name: null | string;
      username: string;
    } | null> {
      password;
      return Promise.resolve({
        email: 'email@email.com',
        id: 'valid_id',
        name: 'john',
        username,
      });
    }

    findUserById(id: string): Promise<{
      email: string;
      id: string;
      name: null | string;
      username: string;
    } | null> {
      throw new Error('Method not implemented.' + id);
    }

    findUserByUsername(username: string): Promise<{
      email: string;
      id: string;
      name: null | string;
      username: string;
    } | null> {
      throw new Error('Method not implemented. ' + username);
    }
  }

  const authRepository = new AuthRepositoryStub();
  const bcryptAdapter = new BcryptAdapter();
  const jwt = new JWTHelper('secret-test-key');
  const authLoginService = new AuthLoginService(
    authRepository,
    bcryptAdapter,
    jwt
  );

  return { authLoginService, authRepository };
};

describe('Auth Login Service Sut', () => {
  it('should return token if login is correctly', async () => {
    const { authLoginService, authRepository } = makeSut();

    const userCredentials = {
      password: 'password',
      username: 'usernmae',
    };

    vi.spyOn(authRepository, 'findUserByCredentials');

    const token = authLoginService.execute(userCredentials);

    expect(token).toBeTruthy();
  });

  it('should return return error if credentials are wrong', async () => {
    const { authLoginService, authRepository } = makeSut();

    const userCredentials = {
      password: 'wrong-password',
      username: 'usernmae',
    };

    vi.spyOn(authRepository, 'findUserByCredentials').mockResolvedValue(null);

    const response = authLoginService.execute(userCredentials);

    await expect(response).rejects.toThrowError();
  });
});
