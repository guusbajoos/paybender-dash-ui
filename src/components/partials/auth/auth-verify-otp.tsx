/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStepperNextProps } from '@/schemas'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

import AuthCard from './auth-card'

const AuthVerifyOTP = (
  props: IStepperNextProps<{ otp: string; direction: string }>
) => {
  return (
    <div className='relative'>
      <div className='flex items-center justify-center min-h-screen'>
        <AuthCard title='Please verify your account' hasSeparator>
          <div className='flex flex-col gap-y-6'>
            <p className='text-sm font-medium text-[#777677]'>
              Enter the six OTP code we sent to Google Authenticator to verify
              your Paybender account
            </p>

            <InputOTP maxLength={6}>
              <InputOTPGroup className='mx-auto gap-x-1'>
                <InputOTPSlot
                  index={0}
                  className='size-12 rounded-md border-l text-[#5A5A5A]'
                />
                <InputOTPSlot
                  index={1}
                  className='size-12 rounded-md border-l text-[#5A5A5A]'
                />
                <InputOTPSlot
                  index={2}
                  className='size-12 rounded-md border-l text-[#5A5A5A]'
                />
                <InputOTPSlot
                  index={3}
                  className='size-12 rounded-md border-l text-[#5A5A5A]'
                />
                <InputOTPSlot
                  index={4}
                  className='size-12 rounded-md border-l text-[#5A5A5A]'
                />
                <InputOTPSlot
                  index={5}
                  className='size-12 rounded-md border-l text-[#5A5A5A]'
                />
              </InputOTPGroup>
            </InputOTP>

            <div className='flex flex-col gap-y-2'>
              <Button
                className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
                disabled={props.isLoading}
                onClick={() =>
                  props.onNextStep &&
                  props.onNextStep({ otp: '123', direction: 'next' })
                }
              >
                {props.isLoading ? 'VERIFYING...' : 'VERIFY & CONTINUE'}
              </Button>
              <Button
                className='w-full bg-transparent text-center text-[#3CC1D1] shadow-none hover:bg-transparent focus:bg-transparent'
                onClick={() =>
                  props.onNextStep &&
                  props.onNextStep({ otp: '', direction: 'prev' })
                }
              >
                CANCEL
              </Button>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default AuthVerifyOTP
