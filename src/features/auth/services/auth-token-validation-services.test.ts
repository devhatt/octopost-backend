import { mock } from 'vitest-mock-extended';

import { AuthTokenValidationService } from '@/features/auth/services/auth-token-validation-service';
import type { UserRepository } from '@/features/user/repositories/user-repository';
import { EmailAlreadyActiveError } from '@/shared/errors/email-already-active-error';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

describe('Auth email token validation service sut', () => {
  let sut: AuthTokenValidationService;
  let jwt: JWTHelper;
  let userRepository: UserRepository;

  beforeEach(() => {
    jwt = new JWTHelper('secret-test-key');
    userRepository = mock<UserRepository>(userRepositoryMock);
    sut = new AuthTokenValidationService(userRepositoryMock, jwt);
  });

  describe('Success', () => {
    it('should validate the email confirmation and update the status', async () => {
      const user = UserMock.create({
        isActive: false,
      });

      vi.spyOn(jwt, 'parseToken').mockResolvedValue({
        name: user.name!,
        userId: user.id,
        username: user.username,
      });

      vi.spyOn(userRepository, 'findById').mockResolvedValue(user);

      vi.spyOn(userRepository, 'updateIsActiveStatus').mockImplementationOnce(
        (userId) => {
          if (user.id === userId) {
            user.isActive = true;
          }
          return Promise.resolve();
        }
      );

      await sut.execute({ token: 'token' });

      expect(userRepository.updateIsActiveStatus).toHaveBeenCalledWith(user.id);

      expect(user.isActive).toBe(true);
    });
  });

  describe('Error', () => {
    it('should throw UserNotFound error if user is not found', async () => {
      const token = jwt.createToken({
        name: 'John Doe',
        userId: '1',
        username: 'johndoe',
      });

      vi.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(() => sut.execute({ token })).rejects.toBeInstanceOf(
        UserNotFound
      );
    });

    it('should throw EmailAlreadyActiveError if user is already active', async () => {
      const user = UserMock.create({ isActive: true });

      vi.spyOn(userRepository, 'findById').mockResolvedValue(user);
      vi.spyOn(userRepository, 'updateIsActiveStatus').mockResolvedValue();
      vi.spyOn(jwt, 'parseToken').mockResolvedValue({
        name: user.name!,
        userId: user.id,
        username: user.username,
      });

      expect(userRepository.updateIsActiveStatus).not.toHaveBeenCalled();
      await expect(sut.execute({ token: 'token' })).rejects.toThrow(
        EmailAlreadyActiveError
      );
    });
  });
});
