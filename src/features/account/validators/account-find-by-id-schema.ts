import { z } from 'zod';

export const accountDeleteBySchema = z.object({
  id: z.number().min(1),
});
