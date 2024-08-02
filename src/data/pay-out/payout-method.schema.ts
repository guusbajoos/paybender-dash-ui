import * as z from 'zod'

export const payoutMethodSchema = z.object({
  amount: z
    .number({ coerce: true })
    .int()
    .min(1, { message: 'Min Size Account must be 1' }),
  withdraw_method: z.string({ message: 'Please select a withdraw method' }),
  bank_name: z.string({ message: 'Please select a bank' }),
  acc_holder_name: z
    .string()
    .min(3, 'Account Holder Name must be at least 3 characters'),
  branch_name: z.string().min(3, 'Branch Name must be at least 3 characters'),
  account_number: z
    .string()
    .min(10, 'Account Number must be at least 10 digits')
    .max(20, 'Account Number has exceeds 20 digits'),
})

export interface IStepperNextProps {
  onNextStep?: () => void
}
