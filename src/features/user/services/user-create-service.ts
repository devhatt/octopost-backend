import type { Service } from '@/shared/protocols/service';
import { UserCreateModel } from '../models/user-create-model';

export class UserCreateService implements Service {
  constructor() {}

  async execute({ email, password }: UserCreateModel) {
    return {
      email,
      password,
      id: '1',
    };
  }
}
