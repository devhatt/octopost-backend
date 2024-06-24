import type { Service } from '@/shared/protocols/service';

import type { SocialMediaModel } from '../models/social-media-model';
import type { SocialMediaRepository } from '../repositories/social-media';

type Output = {
  socialMedias: SocialMediaModel[];
};

export class ListSocialMediasService implements Service<void, Output> {
  constructor(private readonly socialMediaRepository: SocialMediaRepository) {}

  async execute(): Promise<Output> {
    const socialMedias = await this.socialMediaRepository.list();

    return {
      socialMedias,
    };
  }
}
