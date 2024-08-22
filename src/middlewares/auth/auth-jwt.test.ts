import { faker } from '@faker-js/faker';
import type { Request, Response } from 'express';
import { mock } from 'vitest-mock-extended';

import type { UserRepository } from '@/features/user/repositories/user-repository';
import { AuthenticationJWT } from '@/middlewares/auth/auth-jwt';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';

const secretKey = '321';

describe('[MIDDLEWARE] JWT', () => {
  let sut: AuthenticationJWT;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: ReturnType<typeof vi.fn>;

  const jwtHelper = new JWTHelper(secretKey as string);
  const userRepoMock = mock<UserRepository>(userRepositoryMock);

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer' } };
    res = { json: vi.fn(), status: vi.fn().mockReturnThis() };
    next = vi.fn();

    new JWTHelper(secretKey as string);

    sut = new AuthenticationJWT(jwtHelper, userRepoMock);
  });

  it('should call next if token is valid and user is found', async () => {
    const token = jwtHelper.createToken({
      name: faker.person.fullName(),
      userId: faker.string.uuid(),
      username: faker.person.fullName(),
    });

    req = { headers: { authorization: `Bearer ${token}` } };

    userRepoMock.findById.mockResolvedValueOnce({
      email: faker.internet.email(),
      id: faker.string.uuid(),
      isActive: true,
      name: faker.person.fullName(),
      username: faker.internet.userName(),
    });

    await sut.jwtAuth(req as Request, res as Response, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return status code 401 with error message token missing', async () => {
    req.headers!.authorization = undefined;

    await sut.jwtAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status code 401 with error message invalid token', async () => {
    const token = 'invalidToken';

    req = { headers: { authorization: `Bearer ${token}` } };

    await sut.jwtAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status code 401 with error message invalid user', async () => {
    const token = jwtHelper.createToken({
      name: 'fakeName',
      userId: 'fakeUserId',
      username: 'fakeUsername',
    });

    req = { headers: { authorization: `Bearer ${token}` } };

    await sut.jwtAuth(req as Request, res as Response, next);

    userRepoMock.findById.mockResolvedValueOnce(null);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const mockedError = new Error('fakeError');
    vi.spyOn(jwtHelper, 'parseToken').mockImplementation(() => {
      throw mockedError;
    });

    req = { headers: { authorization: 'Bearer 23123' } };

    await sut.jwtAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(next).not.toHaveBeenCalled();
  });
});
