import Joi from 'joi';
import { Validator } from './validator';
import { ValidationError } from '@/shared/errors/ValidateError';
import { faker } from '@faker-js/faker';

const makeSut = () => {
  const validator = new Validator();

  const schema = Joi.object({ username: Joi.string().required() });

  return { validator, schema };
};

describe('UserValidator', () => {
  describe('create', () => {
    it('should return true if payload is valid', () => {
      const { validator, schema } = makeSut();

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
