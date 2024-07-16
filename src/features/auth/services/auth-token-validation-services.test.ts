import { mock } from 'vitest-mock-extended';

import type { UserRepository } from '@/features/user/repositories/user-repository';
import { EmailAlreadyActiveError } from '@/shared/errors/email-already-active-error';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

import { AuthTokenValidationService } from './auth-token-validation-service';

describe('Auth email token validation service sut', () => {
  let sut: AuthTokenValidationService;
  const jwt = new JWTHelper('secret-test-key');
  const userRepository = mock<UserRepository>(userRepositoryMock);

  beforeEach(() => {
    sut = new AuthTokenValidationService(userRepositoryMock, jwt);
  });

  describe('Success', () => {
    it('should validate the email confirmation and update the status', async () => {
      const userMock = UserMock.create({ isActive: false });
      const token = jwt.createToken({ userId: userMock.id });

      vi.spyOn(userRepository, 'findById').mockResolvedValue(userMock);
      vi.spyOn(userRepository, 'updateIsActiveStatus').mockResolvedValue();

      await sut.execute({ token });

      expect(userRepository.findById).toHaveBeenCalledWith(userMock.id);
      expect(userRepository.updateIsActiveStatus).toHaveBeenCalledWith(
        userMock.id
      );
    });
  });

  describe('Error', () => {
    it('should throw UserNotFound error if user is not found', async () => {
      const userMock = UserMock.create({ isActive: false });
      const token = jwt.createToken({ userId: userMock.id });

      vi.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(() => sut.execute({ token })).rejects.toBeInstanceOf(
        UserNotFound
      );
    });
  });

  it('should throw EmailAlreadyActiveError if user is already active', async () => {
    const userMock = UserMock.create({ isActive: true });
    const token = jwt.createToken({ userId: userMock.id });

    vi.spyOn(userRepository, 'findById').mockResolvedValue(userMock);
    vi.spyOn(userRepository, 'updateIsActiveStatus').mockResolvedValue();

    await expect(() => sut.execute({ token })).rejects.toBeInstanceOf(
      EmailAlreadyActiveError
    );
  });
});
