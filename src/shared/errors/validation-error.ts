import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

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
