import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class ConflictError extends HttpError {
  constructor(public readonly message: string) {
    super(HttpStatusCode.conflict, message);
  }

  public toJSON() {
    return {
      code: this.code,
      error: this.message,
    };
  }
}
