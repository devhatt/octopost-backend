import type { ObjectSchema } from 'joi';
import { ValidationError } from '@/shared/errors/validation-error.js';

export class Validator {
  public validate(schema: ObjectSchema, payload: unknown): boolean {
    const { error } = schema.validate(payload, {
      abortEarly: false,
      presence: 'required',
    });

    if (error) {
      throw new ValidationError(
        error.message,
        error.details.map(({ message }) => message)
      );
    }

    return true;
  }
}
