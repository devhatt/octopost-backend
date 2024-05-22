import type { Request, Response } from 'express';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticationJWT } from './auth-jwt.js';
import type { UserRepository } from '@/features/user/repositories/user-repository/user-repository.js';
import { JWTHelper } from '@/shared/infra/jwt/jwt.js';

const secretKey = '321';

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

    findById(
      id: string
    ): Promise<{
      email: string;
      id: string;
      name: null | string;
      username: string;
    } | null> {
      const user = {
        email: 'fake@example.com',
        id: 'fakeUserId',
        name: 'FakeName',
        username: 'FakeUserName',
      };
      if (id === 'fakeUserId') {
        return Promise.resolve(user);
      }
      return Promise.resolve(null);
    }
  }

  const userRepository = new UserRepositoryStub();
  const jwtHelper = new JWTHelper(secretKey as string);
  const auth = new AuthenticationJWT(jwtHelper, userRepository);

  return { auth, jwtHelper, userRepository };
};

describe('jwtAuth middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: ReturnType<typeof vi.fn>;
  const { auth, jwtHelper } = makeSut();

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer' } };
    res = { json: vi.fn(), status: vi.fn().mockReturnThis() };
    next = vi.fn();
  });

  it('should call next if token is valid and user is found', async () => {
    const token = jwtHelper.createToken({ userId: 'fakeUserId' });

    req = { headers: { authorization: `Bearer ${token}` } };

    await auth.jwtAuth(req as Request, res as Response, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return status code 401 with error message token missing', async () => {
    req.headers!.authorization = undefined;

    await auth.jwtAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status code 401 with error message invalid token', async () => {
    const token = 'token';

    req = { headers: { authorization: `Bearer ${token}` } };

    await auth.jwtAuth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status code 401 with error message invalid user', async () => {
    const token = jwtHelper.createToken({ userId: '2' });

    req = { headers: { authorization: `Bearer ${token}` } };

    await auth.jwtAuth(req as Request, res as Response, next);
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

    await auth.jwtAuth(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(next).not.toHaveBeenCalled();
  });
});
