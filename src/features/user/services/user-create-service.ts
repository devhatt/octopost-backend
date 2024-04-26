import type { UserCreateModel } from '../models/user-create-model.js';
import type { Service } from '@/shared/protocols/service.js';

export class UserCreateService implements Service<UserCreateModel> {
  constructor() {}

  execute({ email, password }: UserCreateModel) {
    return Promise.resolve({
      email,
      id: '1',
      password,
    });
  }
}
