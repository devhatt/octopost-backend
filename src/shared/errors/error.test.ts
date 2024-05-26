import { HttpError } from './http-error.js';
import { UserNotFound } from './user-not-found-error.js';
import { ValidationError } from './validation-error.js';

describe('[Errors]', () => {
  describe('http-error', () => {
    it('should parse to json correctly', () => {
      const error = new HttpError(200, 'error');

      expect(error.toJSON()).toStrictEqual({
        code: 200,
        message: 'error',
      });
    });
  });

  describe('validate-error', () => {
    it('should parse to json correctly', () => {
      const error = new ValidationError('error', [
        'first validation error',
        'second validation error',
      ]);

      expect(error.toJSON()).toStrictEqual({
        code: 400,
        errors: ['first validation error', 'second validation error'],
      });
    });
  });

  describe('user-not-found-error', () => {
    it('should parse to json correctly without additional errors', () => {
      const error = new UserNotFound();

      expect(error.toJSON()).toStrictEqual({
        code: 404,
        errors: null,
      });
    });

    it('should parse to json correctly with additional errors', () => {
      const additionalErrors = ['first error', 'second error'];
      const error = new UserNotFound('User not found', additionalErrors);

      expect(error.toJSON()).toStrictEqual({
        code: 404,
        errors: additionalErrors,
      });
    });
  });
});
