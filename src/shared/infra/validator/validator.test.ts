import Joi from 'joi';
import { faker } from '@faker-js/faker';
import { Validator } from './validator.js';
import { ValidationError } from '@/shared/errors/validation-error.js';

const makeSut = () => {
  const validator = new Validator();

  const schema = Joi.object({ username: Joi.string().required() });

  return { schema, validator };
};

describe('UserValidator', () => {
  describe('create', () => {
    it('should return true if payload is valid', () => {
      const { schema, validator } = makeSut();

      const payload = {
        username: faker.internet.userName(),
      };

      const result = validator.validate(schema, payload);

      expect(result).toBe(true);
    });

    it('should throw ValidateError if payload is invalid', () => {
      const { schema, validator } = makeSut();

      const payload = {
        username: faker.number.int(),
      };

      expect(() => {
        validator.validate(schema, payload);
      }).toThrow(ValidationError);
    });
  });
});
