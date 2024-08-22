import type { SocialMediaModel } from '@/features/social-media/models/social-media-model';
import type { SocialMediaRepository } from '@/features/social-media/repositories/social-media';
import type { Service } from '@/shared/protocols/service';

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
