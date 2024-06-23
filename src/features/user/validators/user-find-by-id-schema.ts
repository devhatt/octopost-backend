import { z } from 'zod';

export const userFindByIdParamsSchema = z.object({
  id: z.string().uuid(),
});
