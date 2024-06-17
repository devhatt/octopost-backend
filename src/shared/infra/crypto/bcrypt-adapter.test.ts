import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

import { BcryptAdapter } from './bcrypt-adapter';

const makeSut = () => {
  const crypto = new BcryptAdapter();
  const { password } = UserMock.create();

  return { crypto, password };
};

describe('Crypto test', () => {
  describe('encrypt passwords', () => {
    it('should hash a password correctly', async () => {
      const { crypto, password } = makeSut();
      const hashedPassword = 'hashed_password';
      const hashStub = vi
        .spyOn(crypto, 'encrypt')
        .mockResolvedValue(hashedPassword);

      const result = await crypto.encrypt(password);
      expect(result).toBe(hashedPassword);
      hashStub.mockRestore();
    });
  });
  describe('compare passwords', () => {
    it('should return true if passwords match', async () => {
      const { crypto, password } = makeSut();
      const compareStub = vi.spyOn(crypto, 'compare').mockResolvedValue(true);

      const hashedPassword = await crypto.encrypt(password);
      const result = await crypto.compare(password, hashedPassword);

      expect(result).toBe(true);
      compareStub.mockRestore();
    });

    it('should return false if passwords do not match', async () => {
      const { crypto } = makeSut();
      const compareStub = vi.spyOn(crypto, 'compare').mockResolvedValue(false);
      const result = await crypto.compare(
        'wrong_password',
        'randomHashedPassword'
      );
      expect(result).toBe(false);
      compareStub.mockRestore();
    });
  });
});
