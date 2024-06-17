import type { SocialMediaModel } from '../models/social-media-model';
import type { SocialMediaRepository } from '../repositories/social-media';
import type { Service } from '@/shared/protocols/service';

export class ListSocialMediasService implements Service<SocialMediaModel> {
  constructor(private readonly socialMediaRepository: SocialMediaRepository) {}

  async execute() {
    return await this.socialMediaRepository.list();
  }
}
