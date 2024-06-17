import type { UserFindByIdModel } from '@/features/user/models/user-find-by-id-model';
import type { UserRepository } from '@/features/user/repositories/user-repository/user-repository';
import type { Service } from '@/shared/protocols/service';

export class UserFindByIdService implements Service<UserFindByIdModel> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: UserFindByIdModel) {
    const user = await this.userRepository.findById(id);

    if (user === null || user === undefined) {
      return null;
    }

    return user;
  }
}
