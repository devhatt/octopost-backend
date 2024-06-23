import { z } from 'zod';

export const userCreateBodySchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!#$&*@])(?=.*[\dA-Za-z]).{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long.'
    ),

  repeatPassword: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!#$&*@])(?=.*[\dA-Za-z]).{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long.'
    ),
  username: z.string().min(3),
});
