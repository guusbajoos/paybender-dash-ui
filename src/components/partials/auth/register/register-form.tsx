import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { registerSchema } from '@/schemas/auth/register.schema'
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

const RegisterForm = (
  props: IStepperNextProps<z.infer<typeof registerSchema>>
) => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      repassword: '',
      role_id: 0,
    },
    mode: 'onChange',
  })

  const onSubmit = (val: z.infer<typeof registerSchema>) => {
    if (Object.keys(form.formState.errors).length === 0) {
      props.onNextStep && props.onNextStep(val)
    }
  }

  return (
    <div className='relative z-0'>
      <div className='flex min-h-screen items-center justify-center'>
        <AuthCard title='Enter Credentials' hasSeparator>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-y-3'
            >
              <FormField
                control={form.control}
                name='fullname'
                render={({ field }) => (
                  <FormItem className='!mt-0'>
                    <FormLabel className='font-normal text-[#777677]'>
                      Full Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='John Doe'
                        {...field}
                        disabled={props.isLoading}
                        className='disabled:bg-gray-200'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  </FormItem>
                )}
              />
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

              {/* <div className='mt-2 text-end'>
                <Link
                  to='/auth/forgot-password'
                  className='text-right text-sm font-medium text-[#FF5050]'
                >
                  Forgot password?
                </Link>
              </div> */}

              <div className='mt-6'>
                <Button
                  className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
                  type='submit'
                  disabled={props.isLoading}
                >
                  {props.isLoading ? 'SUBMITING...' : 'SUBMIT'}
                </Button>
              </div>
            </form>
          </Form>

          <div className='mt-6 text-center'>
            <Button variant='link' asChild>
              <Link to='/auth/login' className='text-sm font-normal'>
                Already have an account?
              </Link>
            </Button>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default RegisterForm
