import Joi from 'joi';

const authBodySchema = Joi.object({
  password: Joi.string().required(),
  username: Joi.string().required(),
});

export const authSchema = Joi.object({
  body: authBodySchema,
});
