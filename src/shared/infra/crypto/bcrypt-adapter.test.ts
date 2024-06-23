import { BcryptAdapter } from './bcrypt-adapter';

describe('Cryto Adapter - Bcrypt', () => {
  let crypto: BcryptAdapter;

  beforeEach(() => {
    crypto = new BcryptAdapter();
  });

  it('return a hash on success', async () => {
    const input = 'password';

    const hash = await crypto.encrypt(input);

    expect(hash).toBeTruthy();
    expect(hash).not.toBe(input);
  });

  it('return true if compare is successful', async () => {
    const input = 'password';

    const hash = await crypto.encrypt(input);

    const isValid = await crypto.compare(input, hash);

    expect(hash).toBeTruthy();
    expect(isValid).toBe(true);
  });
});
