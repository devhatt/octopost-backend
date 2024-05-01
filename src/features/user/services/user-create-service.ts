import type { UserCreateModel } from '../models/user-create-model.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import type { Service } from '@/shared/protocols/service.js';

export class UserCreateService implements Service<UserCreateModel> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, name, password, username }: UserCreateModel) {
    await this.userRepository.create({
      email,
      name,
      password,
      username,
    });
  }
}
