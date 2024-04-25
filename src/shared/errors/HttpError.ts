import { HttpStatusCode } from '../protocols/http-client';

export class HttpError extends Error {
  constructor(
    public readonly code: number,
    message: string
  ) {
    super(message);
  }

  public toJSON(): object {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
