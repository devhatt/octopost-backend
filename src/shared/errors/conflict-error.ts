import { HttpStatusCode } from '../protocols/http-client.js';
import { HttpError } from './http-error.js';

export class ConflictError extends HttpError {
  constructor(public readonly message: string) {
    super(HttpStatusCode.conflict, message);
  }

  public toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
