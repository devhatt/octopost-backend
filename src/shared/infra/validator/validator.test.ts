import { faker } from '@faker-js/faker';
import Joi from 'joi';

import { ValidationError } from '@/shared/errors/validation-error';

import { Validator } from './validator';

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
