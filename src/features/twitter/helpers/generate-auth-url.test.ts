import { GenerateAuthURL } from './generate-auth-url';

describe('GenerateAuthUrl', () => {
  let sut: GenerateAuthURL;
  let id: string;

  beforeEach(() => {
    sut = new GenerateAuthURL();
    id = '1';
  });

  it('should return the generated twitter auth URL', () => {
    const url = sut.twitter({ id });

    expect(url).toBe(
      `https://twitter.com/i/oauth2/authorize?client_id=undefined&code_challenge=-a4-ROPIVaUBVj1qqB2O6eN_qSC0WvET0EdUEhSFqrI&code_challenge_method=S256&redirect_uri=http%3A%2F%2Fwww.localhost%3A3000%2Fapi%2Ftwitter%2Fcallback&response_type=code&state=${id}&scope=tweet.write%20tweet.read%20users.read`
    );
  });
});
