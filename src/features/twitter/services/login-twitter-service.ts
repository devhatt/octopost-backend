import type { Service } from '@/shared/protocols/service';

import type { GenerateAuthURL } from '../helpers/generate-auth-url';

type Input = {
  userId: string;
};

export class LoginTwitterService implements Service<Input, string> {
  constructor(private readonly generateAuthUrl: GenerateAuthURL) {}

  execute({ userId }: Input) {
    const url = this.generateAuthUrl.twitter({ id: userId });

    return url;
  }
}
