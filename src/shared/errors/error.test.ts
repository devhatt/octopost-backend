import { HttpError } from './http-error.js';
import { ValidationError } from './validation-error.js';

describe('[Errors]', () => {
  describe('http-error', () => {
    it('should parse to json correctly', async () => {
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
});
