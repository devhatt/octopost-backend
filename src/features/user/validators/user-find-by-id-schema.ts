import Joi from 'joi';

export const userFindByIdParamsSchema = Joi.object({
  id: Joi.string().guid().required(),
});

export const userFindByIdSchema = Joi.object({
  body: Joi.object().required(),
  params: userFindByIdParamsSchema,
  path: Joi.string().required(),
  query: Joi.object().required(),
});
