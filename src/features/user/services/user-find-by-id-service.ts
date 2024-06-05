import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import type { Service } from '@/shared/protocols/service.js';
import type { UserFindByIdModel } from '@/features/user/models/user-find-by-id-model.js';

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
