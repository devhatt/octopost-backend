import { HttpStatusCode } from '../protocols/http-client';
import { HttpError } from './http-error';

export class InvalidCredentialsError extends HttpError {
  constructor(public readonly message: string = 'Invalid Credentials') {
    super(HttpStatusCode.unauthorized, message);
  }

  public toJSON() {
    return {
      code: this.code,
      error: this.message,
    };
  }
}
