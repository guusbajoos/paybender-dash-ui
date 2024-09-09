import * as z from 'zod'

// export interface IUser {
//   user_id: number
//   username: string
//   email: string
//   full_name: string
//   is_active: number
//   last_login: string
//   role_id: number
//   role_name: string
//   ga_validation_flag: number
//   ga_secret: string
//   ga_secret_url: string
//   token: string
//   qr_code_url: string
//   created_date: string
//   validation_code: string
//   validation_expired_datetime: string
//   is_validated: number
//   validated_at: string
//   password: string
// }

export const registerSchema = z.object({
  fullname: z
    .string({ required_error: 'Full Name is required' })
    .min(3, 'Full Name must be at least 3 characters'),
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
      message: 'Confirm Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Confirm Password must contain at least one lowercase letter',
    }),
  role_id: z.number().optional(),
})
