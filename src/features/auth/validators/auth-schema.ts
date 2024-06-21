import { z } from 'zod';

export const authBodySchema = z.object({
  password: z.string(),
  username: z.string(),
});
