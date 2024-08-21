import { z } from 'zod';

export const accountDeleteBySchema = z.object({
  id: z.coerce.number().min(1),
});
