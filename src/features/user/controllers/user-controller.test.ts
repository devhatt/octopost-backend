import { UserCreateService } from '@/features/user/services/user-create-service';
import { UserController } from './user-controller';
import { Validator } from '@/shared/infra/validator/validator';

const makeSut = () => {
  const validator = new Validator();
  const userCreateService = new UserCreateService();

  const userController = new UserController(validator, userCreateService);

  return {
    validator,
    userCreateService,
    userController,
  };
};

describe('UserController', () => {
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
