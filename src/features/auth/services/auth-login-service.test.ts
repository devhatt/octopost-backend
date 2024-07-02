import { BcryptAdapter } from '@/shared/infra/crypto/bcrypt-adapter.js';
import { JWTHelper } from '@/shared/infra/jwt/jwt.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';

import { AuthRepository } from '../repositories/auth-repository/auth-repository.js';
import { AuthLoginService } from './auth-login-service.js';

const makeSut = () => {
  const authRepository = new AuthRepository();
  const bcryptAdapter = new BcryptAdapter();
  const jwt = new JWTHelper('secret-test-key');
  const authLoginService = new AuthLoginService(
    authRepository,
    bcryptAdapter,
    jwt
  );

  const userMock = UserMock.create();

  const userCredentials = {
    password: userMock.password,
    username: userMock.username,
  };

  return {
    authLoginService,
    authRepository,
    bcryptAdapter,
    userCredentials,
    userMock,
  };
};

describe('Auth Login Service Sut', () => {
  it('should return token if login is correctly', async () => {
    const {
      authLoginService,
      authRepository,
      bcryptAdapter,
      userCredentials,
      userMock,
    } = makeSut();

    vi.spyOn(bcryptAdapter, 'compare').mockResolvedValueOnce(true);

    vi.spyOn(authRepository, 'findUserByUsername').mockResolvedValueOnce({
      email: userMock.email,
      id: userMock.id,
      name: userMock.name,
      password: userMock.password,
      username: userMock.username,
    });

    const token = authLoginService.execute(userCredentials);

    expect(token).toBeTruthy();
  });

  it('should return return error if username dont exists', async () => {
    const { authLoginService, authRepository, userCredentials } = makeSut();

    vi.spyOn(authRepository, 'findUserByUsername').mockResolvedValue(null);

    const response = authLoginService.execute(userCredentials);

    await expect(response).rejects.toThrowError();
  });

  it('should return return error if password are wrong', async () => {
    const {
      authLoginService,
      authRepository,
      bcryptAdapter,
      userCredentials,
      userMock,
    } = makeSut();

    const response = authLoginService.execute(userCredentials);

    vi.spyOn(authRepository, 'findUserByUsername').mockResolvedValueOnce({
      email: userMock.email,
      id: userMock.id,
      name: userMock.name,
      password: userMock.password,
      username: userMock.username,
    });

    vi.spyOn(bcryptAdapter, 'compare').mockResolvedValueOnce(false);

    await expect(response).rejects.toThrowError();
  });
});
