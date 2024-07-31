import { z } from 'zod';

export const accountDeleteByParamsSchema = z.object({
  id: z.string().uuid(),
});

export const accountDeleteBySchema = z.object({
  params: accountDeleteByParamsSchema,
});
