import type { UserRepository } from '@/features/user/repositories/user-repository';
import type { Service } from '@/shared/protocols/service';

type Input = {
  id: string;
};

type Output = {
  user: {
    email: string;
    id: string;
    name: null | string;
    username: string;
  };
};

export class UserFindByIdService implements Service<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user,
    };
  }
}
