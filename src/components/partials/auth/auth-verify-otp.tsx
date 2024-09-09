/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import useAuth from '@/store/use-auth'

import { IStepperNextProps } from '@/schemas'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

import AuthCard from './auth-card'

const AuthVerifyOTP = (
  props: IStepperNextProps<{ email?: string; otp?: string; direction: string }>
) => {
  const user = useAuth((state) => state.user)

  const [otp, setOTP] = useState('')

  return (
    <div className='relative'>
      <div className='flex min-h-screen items-center justify-center'>
        <AuthCard title='Please verify your account' hasSeparator>
          <div className='flex flex-col gap-y-6'>
            {!user.lastlogin && (
              <>
                <p className='text-sm font-medium text-[#777677]'>
                  Please scan the QR code below with your authentication app to
                  receive a one-time password (OTP).
                </p>
                <div className='mx-auto size-[294px] rounded-sm bg-[#EEF9FA] p-6'>
                  <img
                    alt='QR Code'
                    className='h-full w-full object-cover'
                    src={user.qrCodeUrl}
                  />
                </div>
              </>
            )}

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
                  props.onNextStep({
                    email: user.email,
                    otp,
                    direction: 'next',
                  })
                }
              >
                {props.isLoading ? 'VERIFYING...' : 'VERIFY & CONTINUE'}
              </Button>
              <Button
                className='w-full bg-transparent text-center text-[#3CC1D1] shadow-none hover:bg-transparent focus:bg-transparent'
                onClick={() =>
                  props.onNextStep &&
                  props.onNextStep({ email: '', otp: '', direction: 'prev' })
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
