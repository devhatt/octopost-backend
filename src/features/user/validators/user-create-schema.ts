import Joi from 'joi';

const userCreateBodySchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[!#$&*@])(?=.*[\dA-Za-z]).{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long.',
    }),
  repeatPassword: Joi.ref('password'),
  username: Joi.string().min(3).required(),
});

export const userCreateSchema = Joi.object({
  body: userCreateBodySchema,
});
