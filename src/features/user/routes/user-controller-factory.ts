import { Validator } from '@/shared/infra/validator/validator';
import { UserController } from '../controllers/user-controller';
import { UserCreateService } from '../services/user-create-service';

export function userControllerFactory() {
  const userServiceFindAll = new UserCreateService();
  const validator = new Validator();
  const userController = new UserController(validator, userServiceFindAll);

  return { userController };
}
