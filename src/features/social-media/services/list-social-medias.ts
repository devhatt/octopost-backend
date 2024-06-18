import type { Service } from '@/shared/protocols/service';

import type { SocialMediaModel } from '../models/social-media-model';
import type { SocialMediaRepository } from '../repositories/social-media';

export class ListSocialMediasService implements Service<SocialMediaModel> {
  constructor(private readonly socialMediaRepository: SocialMediaRepository) {}

  async execute() {
    return await this.socialMediaRepository.list();
  }
}
