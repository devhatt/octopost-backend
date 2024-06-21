import Joi from 'joi';

export const accountDeleteByParamsSchema = Joi.object({
  id: Joi.string().guid().required(),
});

export const accountDeleteBySchema = Joi.object({
  params: accountDeleteByParamsSchema,
});
