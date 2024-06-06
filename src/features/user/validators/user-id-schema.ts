import Joi from 'joi';

export const userIdParamsSchema = Joi.object({
  params: {
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
  },
});
