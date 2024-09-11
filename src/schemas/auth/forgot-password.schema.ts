import * as z from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
})

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    }),
  repassword: z
    .string({ required_error: 'Confirm Password is required' })
    .min(8, 'Confirm Password must be at least 8 characters')
    .regex(/[A-Z]/, {
      message: 'Confirm Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Confirm Password must contain at least one lowercase letter',
    }),
})
