import * as z from 'zod'

export const payoutMethodSchema = z.object({
  amount: z
    .number({ coerce: true })
    .int()
    .min(1, { message: 'Min Size Account must be 1' }),
  channel_method: z.string({
    required_error: 'Please select a withdraw channel method',
  }),
  channel: z.string({
    required_error: 'Please select a withdraw channel name',
  }),
  // bank_name: z.string({ message: 'Please select a bank' }),
  customerName: z
    .string()
    .min(3, 'Receiver Account Name must be at least 3 characters')
    .optional(),
  customerPhone: z
    .string()
    .min(10, 'Receiver Account Number must be at least 10 digits')
    .max(13, 'Receiver Account Number has exceeds 20 digits')
    .optional(),
})

export interface IStepperNextProps {
  onNextStep?: () => void
}
