import type { HttpAdapter } from '@/shared/infra/http/http-adapter';
import type { Logger } from '@/shared/infra/logger/logger';
import type { Service } from '@/shared/protocols/service';

import type { TwitterPostResponse } from '../models/twitter-models';

type Input = {
  file?: File;
  text?: string;
};

export class PostTwitterService implements Service<Input, void> {
  constructor(
    private readonly logger: Logger,
    private readonly http: HttpAdapter
  ) {}

  async execute({ file, text }) {
    try {
      const { data } = await this.http.post<TwitterPostResponse>({
        data: {
          file,
          text,
        },
        url: '/2/tweets',
      });

      return data.text;
    } catch (err) {
      this.logger.error(`Error on postTwitter in twitter service -${err}`);
      throw err;
    }
  }
}
