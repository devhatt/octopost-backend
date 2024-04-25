import { HttpStatusCode } from '../protocols/http-client.js';
import { HttpError } from './http-error.js';

export class ValidationError extends HttpError {
  constructor(
    public readonly message: string,
    private errors: unknown
  ) {
    super(HttpStatusCode.badRequest, message);
  }

  public toJSON() {
    return {
      code: this.code,
      errors: this.errors,
    };
  }
}
