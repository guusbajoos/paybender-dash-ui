import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import ImagePath from '@/assets/images/auth-bg-left.png'

import { loginSchema } from '@/schemas/auth/login.schema'
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

const LoginForm = (props: IStepperNextProps<z.infer<typeof loginSchema>>) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (val: z.infer<typeof loginSchema>) => {
    if (Object.keys(form.formState.errors).length === 0) {
      props.onNextStep && props.onNextStep(val)
    }
  }

  return (
    <div
      className='relative z-0'
      style={{
        backgroundImage: `url(${ImagePath})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
      }}
    >
      <div className='flex min-h-screen items-center justify-center'>
        <AuthCard title='Enter Credentials' hasSeparator>
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

              <div className='mt-2 text-end'>
                <Link
                  to='/auth/forgot-password'
                  className='text-right text-sm font-medium text-[#FF5050]'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
                type='submit'
                disabled={props.isLoading}
              >
                {props.isLoading ? 'SUBMITING...' : 'SUBMIT'}
              </Button>
            </form>
          </Form>

          <div className='mt-6 text-center'>
            <Button variant='link' asChild>
              <Link to='/auth/register' className='text-sm font-normal'>
                Don't have an account?
              </Link>
            </Button>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default LoginForm
