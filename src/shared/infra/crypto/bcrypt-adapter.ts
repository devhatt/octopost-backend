import { compare, hash } from 'bcrypt';

import type { CryptoAdapter } from './crypto-adapter';

export class BcryptAdapter implements CryptoAdapter {
  private SALT = 8;

  compare(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  async encrypt(password: string) {
    return hash(password, this.SALT);
  }
}
