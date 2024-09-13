import { GenerateAuthURL } from '../helpers/generate-auth-url';
import { LoginTwitterService } from './login-twitter-service';

describe('LoginTwitterService', () => {
  let sut: LoginTwitterService;
  let generateAuthUrl: GenerateAuthURL;
  let id: string;

  beforeEach(() => {
    generateAuthUrl = new GenerateAuthURL();
    sut = new LoginTwitterService(generateAuthUrl);
    id = '1';
  });

  it('should return the generated auth URL', () => {
    const result = sut.execute({ userId: id });

    expect(result).toContain('https://twitter.com/i/oauth2/authorize');
  });
});
