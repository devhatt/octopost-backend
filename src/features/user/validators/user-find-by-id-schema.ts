import Joi from 'joi';

export const userFindByIdParamsSchema = Joi.object({
  id: Joi.string().guid().required(),
});

export const userFindByIdSchema = Joi.object({
  params: userFindByIdParamsSchema,
  path: Joi.string().required(),
});
