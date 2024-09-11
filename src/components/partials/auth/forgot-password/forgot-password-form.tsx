// import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { forgotPasswordSchema } from '@/schemas/auth/forgot-password.schema'
import { IStepperNextProps } from '@/schemas'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import AuthCard from '@/components/partials/auth/auth-card'

const ForgotPasswordForm = (
  props: IStepperNextProps<z.infer<typeof forgotPasswordSchema>>
) => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (val: z.infer<typeof forgotPasswordSchema>) => {
    if (Object.keys(form.formState.errors).length === 0) {
      props.onNextStep && props.onNextStep(val)
    }
  }

  return (
    <div className='relative'>
      <div className='flex min-h-screen items-center justify-center'>
        <AuthCard title='Please Input Your Email' hasSeparator>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-y-3'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='!mt-0'>
                    <FormLabel className='font-normal text-[#777677]'>
                      Email
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='johndoe@gmail.com'
                        {...field}
                        disabled={props.isLoading}
                        className='disabled:bg-gray-200'
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className='font-medium text-[#777677]'>
                      Enter the email address associated with your account and
                      we’ll send you a link to reset your password
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className='mt-6'>
                <Button
                  className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90 disabled:bg-[#C7C7C7]'
                  type='submit'
                  disabled={props.isLoading || !form.formState.isValid}
                >
                  {props.isLoading ? 'SUBMITING...' : 'SUBMIT'}
                </Button>
              </div>
            </form>
          </Form>
        </AuthCard>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
