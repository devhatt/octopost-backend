import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class BadRequestError extends HttpError {
  constructor(public readonly message: string) {
    super(HttpStatusCode.badRequest, message);
  }

  public toJSON() {
    return {
      code: HttpStatusCode.badRequest,
      error: this.message,
    };
  }
}
