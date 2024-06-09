import type { UserCreateModel } from '../models/user-create-model.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import { ValidationError } from '@/shared/errors/validation-error.js';
import type { Service } from '@/shared/protocols/service.js';
import type { CryptoAdapter } from '@/shared/infra/crypto/crypto-adapter.js';

export class UserCreateService implements Service<UserCreateModel> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypto: CryptoAdapter
  ) {}

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

    const passwordEncrypted = await this.crypto.encrypt(password);

    await this.userRepository.create({
      email,
      name,
      password: passwordEncrypted,
      username,
    });
  }
}
