export interface CryptoAdapter {
  compare: (password: string, hashedPassword: string) => Promise<boolean>;
  encrypt: (password: string) => Promise<string>;
}
