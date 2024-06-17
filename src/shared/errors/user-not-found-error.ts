import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

export class UserNotFound extends HttpError {
  constructor(
    public readonly message: string = 'User not found',
    private errors?: unknown
  ) {
    super(HttpStatusCode.notFound, message);
    if (errors === undefined) this.errors = null;
  }

  public toJSON() {
    return {
      code: this.code,
      errors: this.errors,
    };
  }
}
