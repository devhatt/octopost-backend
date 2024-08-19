import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

export class ValidationError extends HttpError {
  constructor(
    public readonly message: string,
    statusCode: HttpStatusCode = HttpStatusCode.badRequest
  ) {
    super(statusCode, message);
  }

  public toJSON() {
    return {
      code: this.code,
      errors: this.message,
    };
  }
}
