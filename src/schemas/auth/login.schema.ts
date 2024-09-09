import * as z from 'zod'

export interface IUser {
  userId: number
  username: string
  email: string
  fullname: string
  is_active: number
  lastlogin: string
  roleId: number
  roleName: string
  gaValidationFlag: number
  qrCodeUrl: string
}

export const loginSchema = z.object({
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
  role_id: z.number().optional(),
})
