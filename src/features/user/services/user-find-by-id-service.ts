import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import type { Service } from '@/shared/protocols/service.js';

export class UserFindByIdService implements Service {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    return await this.userRepository.findById(id);
  }
}
