import type { UserCreateModel } from '../models/user-create-model.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { ConflictError } from '@/shared/errors/conflict-error.js';
import type { Service } from '@/shared/protocols/service.js';

export class UserCreateService implements Service<UserCreateModel> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, name, password, username }: UserCreateModel) {
    const user = await this.userRepository.findByUsernameOrEmail(
      username,
      email
    );

    if (user) {
      throw new ConflictError('The username or email is already on use.');
    }

    await this.userRepository.create({
      email,
      name,
      password,
      username,
    });
  }
}
