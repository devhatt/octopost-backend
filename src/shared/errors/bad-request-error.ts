import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

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
