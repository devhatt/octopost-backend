import Joi from 'joi';

const userCreateBodySchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});

export const userCreateSchema = Joi.object({
  body: userCreateBodySchema,
});

export const userGetSchema = Joi.object({
  id: Joi.string().required().pattern(new RegExp('^\\d+$')),
});
