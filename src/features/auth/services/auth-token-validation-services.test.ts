import type { AuthRepository } from '@/features/authentication/repositories/auth-repository/auth-repository.js';
import { UserNotFound } from '@/shared/errors/user-not-found-error.js';
import { JWTHelper } from '@/shared/infra/jwt/jwt.js';
import { AuthTokenValidationService } from './auth-token-validation-service.js';
import { makeUserMock } from './factory/make-faker-user.js';

const makeAuthRepository = () => {
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
      return Promise.resolve({
        email: 'email@email.com',
        id: id,
        name: 'Yan Edwards',
        username: 'pajezinho_fofinho',
      });
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
  const jwt = new JWTHelper('secret-test-key');
  const sut = new AuthTokenValidationService(authRepository, jwt);

  return { authRepository, sut };
};

describe('Auth Email Token Validation Service Sut', () => {
  describe('Sucess', () => {
    it('should validate the users token', async () => {
      const { authRepository, sut } = makeAuthRepository();
      const userMock = makeUserMock();
      const jwt = new JWTHelper('secret-test-key');

      vi.spyOn(jwt, 'parseToken').mockResolvedValue({
        userId: userMock.id,
      });

      vi.spyOn(authRepository, 'findUserById').mockResolvedValue(userMock);

      const user = await sut.execute({ token: 'valid_token' });

      expect(user.id).toEqual(userMock.id);
    });
  });
  describe('Error', () => {
    it('the user token should not be validated, because it was not found', async () => {
      const { authRepository, sut } = makeAuthRepository();
      const userMock = makeUserMock();
      const jwt = new JWTHelper('secret-test-key');

      vi.spyOn(jwt, 'parseToken').mockResolvedValue({
        userId: userMock.id,
      });
      vi.spyOn(authRepository, 'findUserById').mockResolvedValue(null);

      const userNotFound = sut.execute({ token: 'valid_token' });
      await expect(userNotFound).rejects.toBeInstanceOf(UserNotFound);
    });
  });
});
