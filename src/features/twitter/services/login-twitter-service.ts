import type { Service } from '@/shared/protocols/service';

import { GenerateAuthURL } from '../helpers/generate-auth-url';

type Input = {
  userId: string;
};

export class LoginTwitterService implements Service<Input, string> {
  execute({ userId }: Input) {
    const generateAuthURL = new GenerateAuthURL();
    const url = generateAuthURL.twitter({ id: userId });

    return url;
  }
}
