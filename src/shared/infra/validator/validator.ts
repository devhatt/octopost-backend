import { ValidationError } from '@/shared/errors/ValidateError';
import { ObjectSchema } from 'joi';

export class Validator {
  public validate(schema: ObjectSchema, payload: any): boolean {
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
