import { HttpError } from './HttpError';

export class ValidateError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
