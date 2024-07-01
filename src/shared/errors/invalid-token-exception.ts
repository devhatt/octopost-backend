export class InvalidTokenException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
