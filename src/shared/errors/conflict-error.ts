import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

export class ConflictError extends HttpError {
  constructor(public readonly message: string) {
    super(HttpStatusCode.conflict, message);
  }

  public toJSON() {
    return {
      code: this.code,
      error: this.message,
    };
  }
}
