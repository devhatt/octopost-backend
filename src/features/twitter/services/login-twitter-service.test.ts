import { LoginTwitterService } from './login-twitter-service';

describe('LoginTwitterService', () => {
  let sut: LoginTwitterService;
  let id: string;

  beforeEach(() => {
    sut = new LoginTwitterService();
    id = '1';
  });

  it('should return the generated auth URL', () => {
    const result = sut.execute({ userId: id });

    expect(result).toContain('https://twitter.com/i/oauth2/authorize');
  });
});
