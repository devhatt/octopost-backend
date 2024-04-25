import Joi from 'joi';

const userCreateBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userCreateSchema = Joi.object({
  body: userCreateBodySchema,
});
