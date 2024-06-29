import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

export class EmailAlreadyActiveError extends HttpError {
  constructor(public readonly message: string) {
    super(HttpStatusCode.conflict, message);
  }

  public toJSON() {
    return {
      code: HttpStatusCode.conflict,
      error: this.message,
    };
  }
}
