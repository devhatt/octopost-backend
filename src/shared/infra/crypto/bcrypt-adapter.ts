import bcrypt from 'bcrypt';
import type { CryptoAdapter } from './crypto-adapter';

export class BcryptAdapter implements CryptoAdapter {
  constructor() {}

  async compare(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }

  async encrypt(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
