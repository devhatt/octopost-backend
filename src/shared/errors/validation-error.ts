import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

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
