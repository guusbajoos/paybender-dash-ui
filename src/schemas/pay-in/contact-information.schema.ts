import * as z from 'zod'

export const contactInformationSchema = z.object({
  first_name: z
    .string()
    .min(3, {
      message: 'First Name must be at least 3 characters.',
    })
    .max(30, {
      message: 'First Name must not be longer than 30 characters.',
    }),
  last_name: z
    .string()
    .min(3, {
      message: 'Last Name must be at least 3 characters.',
    })
    .max(30, {
      message: 'Last Name must not be longer than 30 characters.',
    }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  phone_number: z
    .string()
    .min(10, 'Phone Number must be at least 10 digits')
    .max(13, 'Phone Number has exceeds 13 digits')
    .regex(/^[0-9]+$/, 'Phone Number must only contain digits 0-9'),
  shipping_name: z
    .string()
    .min(3, {
      message: 'Shipping Name must be at least 3 characters.',
    })
    .max(30, {
      message: 'Shipping Name must not be longer than 30 characters.',
    }),
  shipping_country: z.string({ required_error: 'Please select your country' }),
  shipping_email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  shipping_phone: z
    .string()
    .min(10, 'Phone Number must be at least 10 digits')
    .max(13, 'Phone Number has exceeds 13 digits')
    .regex(/^[0-9]+$/, 'Phone Number must only contain digits 0-9'),
  shipping_method: z.string({
    required_error: 'Please select an delivery method',
  }),
  shipping_service: z.string({
    required_error: 'Please select an service',
  }),
})
