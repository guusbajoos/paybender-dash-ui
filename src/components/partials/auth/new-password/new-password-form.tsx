// import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { newPasswordSchema } from '@/schemas/auth/forgot-password.schema'
import { IStepperNextProps } from '@/schemas'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import AuthCard from '@/components/partials/auth/auth-card'

const NewPasswordForm = (
  props: IStepperNextProps<z.infer<typeof newPasswordSchema>>
) => {
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      repassword: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (val: z.infer<typeof newPasswordSchema>) => {
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
                name='password'
                render={({ field }) => (
                  <FormItem className='!mt-0'>
                    <FormLabel className='font-normal text-[#777677]'>
                      Password
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='********'
                        {...field}
                        disabled={props.isLoading}
                        className='disabled:bg-gray-200'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='repassword'
                render={({ field }) => (
                  <FormItem className='!mt-0'>
                    <FormLabel className='font-normal text-[#777677]'>
                      Confirm Password
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='********'
                        {...field}
                        disabled={props.isLoading}
                        className='disabled:bg-gray-200'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-6'>
                <Button
                  className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90 disabled:bg-[#C7C7C7]'
                  type='submit'
                  disabled={props.isLoading}
                >
                  {props.isLoading ? 'RESETTING...' : 'RESET'}
                </Button>
              </div>
            </form>
          </Form>
        </AuthCard>
      </div>
    </div>
  )
}

export default NewPasswordForm
