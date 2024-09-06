import type { UserModel } from '@/features/user/models/user-model';
import type { UserRepository } from '@/features/user/repositories/user-repository';
import { ValidationError } from '@/shared/errors/validation-error';
import type { CryptoAdapter } from '@/shared/infra/crypto/crypto-adapter';
import type { Service } from '@/shared/protocols/service';

type Input = Omit<UserModel, 'id'> & {
  repeatPassword: string;
};

export class UserCreateService implements Service<Input, void> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypto: CryptoAdapter
  ) {}

  async execute({ email, name, password, repeatPassword, username }: Input) {
    if (password != repeatPassword) {
      throw new ValidationError(
        'Cannot process the request because of validation errors',
        ['password', 'repeatPassword']
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
