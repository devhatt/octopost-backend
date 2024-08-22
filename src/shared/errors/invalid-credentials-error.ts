import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

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
