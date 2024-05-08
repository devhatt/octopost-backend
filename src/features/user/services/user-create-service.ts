import type { UserCreateModel } from '../models/user-create-model.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { ConflictError } from '@/shared/errors/conflict-error.js';
import type { Service } from '@/shared/protocols/service.js';

export class UserCreateService implements Service<UserCreateModel> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    repeatPassword,
    username,
  }: UserCreateModel) {
    if (password != repeatPassword) {
      throw new ConflictError(
        'The password and the repetition of the password dont match. '
      );
    }
    await this.userRepository.create({
      email,
      name,
      password,
      username,
    });
  }
}
