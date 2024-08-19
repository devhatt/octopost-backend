import { z } from 'zod';

const regex = /^(?=.*[A-Z])(?=.*[!#$&*@])(?=.*[\dA-Za-z]).{8,}$/;
const passwordMessage =
  'Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long.';

export const userCreateBodySchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().regex(regex, passwordMessage),

  repeatPassword: z.string().regex(regex, passwordMessage),
  username: z.string().min(3),
});
