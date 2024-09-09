import useAuth from '@/store/use-auth'
import { IStepperNextProps } from '@/schemas'

import { Button } from '@/components/ui/button'

import AuthCard from '../auth-card'

const ActiveQRCode = (
  props: Pick<IStepperNextProps<{ direction: string }>, 'onNextStep'>
) => {
  const user = useAuth((state) => state.user)

  return (
    <div className='relative z-0'>
      <div className='flex min-h-screen items-center justify-center'>
        <AuthCard
          title='Scan QR Code'
          description='Scan this QR in Google Auhtenticator to activate your account'
        >
          <div className='mx-auto my-10 size-[294px] rounded-sm bg-[#EEF9FA] p-6'>
            <img
              alt='QR Code'
              className='h-full w-full object-cover'
              src={user.qrCodeUrl}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Button
              className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
              onClick={() =>
                props.onNextStep && props.onNextStep({ direction: 'next' })
              }
            >
              CONTINUE
            </Button>
            <Button
              className='w-full bg-transparent text-center text-[#3CC1D1] shadow-none hover:bg-transparent focus:bg-transparent'
              onClick={() =>
                props.onNextStep && props.onNextStep({ direction: 'prev' })
              }
            >
              Back to Login
            </Button>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default ActiveQRCode
