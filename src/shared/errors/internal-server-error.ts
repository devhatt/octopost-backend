import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

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
