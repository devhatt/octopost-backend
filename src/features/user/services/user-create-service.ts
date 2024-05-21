import type { UserCreateModel } from '../models/user-create-model.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { ValidationError } from '@/shared/errors/validation-error.js';
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
      throw new ValidationError(
        '400',
        'Cannot process the request because of validation errors'
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
