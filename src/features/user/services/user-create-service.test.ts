import { UserCreateService } from './user-create-service.js';

const makeSut = () => {
  const userCreateService = new UserCreateService();

  return { userCreateService };
};

describe('UserCreateService', () => {
  it('should return the created user', async () => {
    const { userCreateService } = makeSut();

    const response = await userCreateService.execute({
      email: 'valid_email@email.com',
      password: 'valid_password',
    });

    expect(response).toStrictEqual({
      email: 'valid_email@email.com',
      password: 'valid_password',
      id: '1',
    });
  });
});
