import { ValidateError } from '@/shared/errors/ValidateError';
import { ObjectSchema } from 'joi';

export class Validator {
  public validate(schema: ObjectSchema, payload: any): boolean {
    const { error } = schema.validate(payload, {
      abortEarly: false,
      presence: 'required',
    });
    if (error) throw new ValidateError(error.message);
    return true;
  }
}
