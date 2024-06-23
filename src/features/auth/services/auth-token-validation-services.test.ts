import { mock } from 'vitest-mock-extended';

import type { UserRepository } from '@/features/user/repositories/user-repository';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';

import { AuthTokenValidationService } from './auth-token-validation-service';
import { makeUserMock } from './factory/make-faker-user';

describe('Auth email token validation service sut', () => {
  let sut: AuthTokenValidationService;
  const userRepository = mock<UserRepository>(userRepositoryMock);

  beforeEach(() => {
    sut = new AuthTokenValidationService(
      userRepositoryMock,
      new JWTHelper('secret-test-key')
    );
  });

  describe('Success', () => {
    it('should validate the users token', async () => {
      const userMock = makeUserMock();
      const jwt = new JWTHelper('secret-test-key');

      vi.spyOn(jwt, 'parseToken').mockResolvedValue({
        userId: userMock.id,
      });

      vi.spyOn(userRepository, 'findById').mockResolvedValue(userMock);

      const user = await sut.execute({ token: 'valid_token' });

      expect(user.id).toEqual(userMock.id);
    });
  });

  describe('Error', () => {
    it('the user token should not be validated, because it was not found', async () => {
      const userMock = makeUserMock();
      const jwt = new JWTHelper('secret-test-key');

      vi.spyOn(jwt, 'parseToken').mockResolvedValue({
        userId: userMock.id,
      });
      vi.spyOn(userRepository, 'findById').mockResolvedValue(null);

      const userNotFound = sut.execute({ token: 'valid_token' });
      await expect(userNotFound).rejects.toBeInstanceOf(UserNotFound);
    });
  });
});
