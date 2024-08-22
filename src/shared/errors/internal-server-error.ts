import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class InternalServerError extends HttpError {
  constructor(public readonly message: string) {
    super(HttpStatusCode.serverError, message);
  }

  public toJSON() {
    return {
      code: HttpStatusCode.serverError,
      error: this.message,
    };
  }
}
