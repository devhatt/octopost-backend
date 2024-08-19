import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

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
