import { BadRequestError } from '@/shared/errors/bad-request-error';
import { ConflictError } from '@/shared/errors/conflict-error';
import { HttpError } from '@/shared/errors/http-error';
import { InternalServerError } from '@/shared/errors/internal-server-error';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import { ValidationError } from '@/shared/errors/validation-error';

import { UnauthorizedHeaderError } from './unauthorized-header-error';

describe('[Errors]', () => {
  describe('http-error', () => {
    it('parses to json correctly', () => {
      const error = new HttpError(200, 'error');

      expect(error.toJSON()).toStrictEqual({
        code: 200,
        message: 'error',
      });
    });
  });

  describe('validate-error', () => {
    it('parses to json correctly', () => {
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
    it('parses to json correctly without additional errors', () => {
      const error = new UserNotFound();

      expect(error.toJSON()).toStrictEqual({
        code: 404,
        errors: null,
      });
    });

    it('parses to json correctly with additional errors', () => {
      const additionalErrors = ['first error', 'second error'];
      const error = new UserNotFound('User not found', additionalErrors);

      expect(error.toJSON()).toStrictEqual({
        code: 404,
        errors: additionalErrors,
      });
    });
  });

  describe('bad-request-error', () => {
    it('parses to json correctly', () => {
      const error = new BadRequestError('error message');

      expect(error.toJSON()).toStrictEqual({
        code: 400,
        error: 'error message',
      });
    });
  });

  describe('conflict-error', () => {
    it('should parse to json correctly', () => {
      const error = new ConflictError('error message');

      expect(error.toJSON()).toStrictEqual({
        code: 409,
        error: 'error message',
      });
    });
  });

  describe('internal-server-error', () => {
    it('correctly serializes the InternalServerError instance to a JSON object', () => {
      const error = new InternalServerError('error message');

      expect(error.toJSON()).toStrictEqual({
        code: 500,
        error: 'error message',
      });
    });
  });

  describe('invalid-credentials-error', () => {
    it('should parse to json correctly', () => {
      const error = new InvalidCredentialsError();

      expect(error.toJSON()).toStrictEqual({
        code: 401,
        error: 'Invalid Credentials',
      });
    });
  });

  describe('unauthorized-header-error', () => {
    it('should parse to json correctly', () => {
      const error = new UnauthorizedHeaderError();

      expect(error.toJSON()).toStrictEqual({
        code: 401,
        error: 'Unauthorized',
      });
    });
  });
});
