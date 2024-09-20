import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class UnauthorizedHeaderError extends HttpError {
  constructor(public readonly message: string = 'Unauthorized') {
    super(HttpStatusCode.unauthorized, message);
  }

  public toJSON() {
    return {
      code: this.code,
      error: this.message,
    };
  }
}
