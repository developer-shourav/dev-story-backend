import { z } from 'zod';

const userValidationSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Name must be a string' })
    .min(1, { message: 'Name is required' }),

  email: z
    .string({ invalid_type_error: 'Email must be a string' })
    .email({ message: 'Invalid email format' }),

  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password cannot be more than 20 characters' })
    , 

  role: z
    .enum(['admin', 'user'], { invalid_type_error: 'Role must be either "admin" or "user"' }),

  isBlocked: z
    .boolean({ invalid_type_error: 'isBlocked must be a boolean' }),
});

export const userValidation = {
  userValidationSchema,
};
