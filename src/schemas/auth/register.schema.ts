import * as z from 'zod'

export const registerSchema = z
  .object({
    fullname: z
      .string({ required_error: 'Fullname is required' })
      .min(3, 'Fullname must be at least 3 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
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
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      }),
    role_id: z.number().optional(),
  })
  .superRefine(({ repassword, password }, ctx) => {
    if (repassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm Password do not match',
        path: ['repassword'],
      })
    }
  })

//   .regex(/[0-9]/, { message: "Password must contain at least one number" })
//   .regex(/[^a-zA-Z0-9]/, {
//     message: "Password must contain at least one special character",
//   }),
