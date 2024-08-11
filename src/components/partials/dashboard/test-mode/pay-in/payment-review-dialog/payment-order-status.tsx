/* eslint-disable react-hooks/exhaustive-deps */

import DANA from '@/assets/images/DANA.png'
import LinkAja from '@/assets/images/LinkAja.png'
import OVO from '@/assets/images/OVO.png'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import useCheckout from '@/store/use-checkout'
import { currencyFormatter } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentOrderStatusPayin = ({
  isOpen,
  onNextStepWallet,
}: {
  isOpen: boolean
  onNextStepWallet: () => void
}) => {
  const navigate = useNavigate()
  const state = useCheckout((state) => state)

  const [remainingTime, setRemainingTime] = useState(3600)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const generateImagePaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'DANA':
        return (
          <img
            src={DANA}
            alt='DANA'
            className='mx-auto h-auto w-[94px] object-contain'
          />
        )

      case 'LinkAja':
        return (
          <img
            src={LinkAja}
            alt='LinkAja'
            className='mx-auto h-auto w-[94px] object-contain'
          />
        )

      case 'OVO':
        return (
          <img
            src={OVO}
            alt='OVO'
            className='mx-auto h-auto w-[94px] object-contain'
          />
        )

      default:
        return <></>
    }
  }

  useEffect(() => {
    if (remainingTime > 0 && state?.data?.stepWallet === 2) {
      const timerId = setTimeout(
        () => setRemainingTime(remainingTime - 1),
        1000
      )
      return () => clearTimeout(timerId) // Cleanup the timer on component unmount
    }
  }, [remainingTime, state.data?.stepWallet])

  if (remainingTime === 0) {
    navigate('/get-started/test-mode')
    state.removeState()
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent isShowCloseButton={false}>
        <DialogHeader>
          <DialogTitle className='text-center font-normal'>
            Thank you for your order!
            <span className='mt-2 block text-base font-normal text-[#5A5A5A]'>
              Order ID : <span className='font-bold'>#Sample-Store-123121</span>
            </span>
          </DialogTitle>
        </DialogHeader>
        <Separator className='!my-0' />
        <DialogDescription className='!mt-0' asChild>
          <div className='flex flex-col gap-y-7'>
            <div className='flex w-fit flex-col gap-y-2'>
              <h3 className='text-sm font-normal text-[#5A5A5A]'>
                Total Payment
              </h3>
              <span className='font-bold text-black'>
                {currencyFormatter(state.data?.cart?.amount, 'IDR')}
              </span>
            </div>

            <div className='bg-gray-300 p-2 text-center font-bold text-black'>
              COMPLETE YOUR PAYMENT IN {formatTime(remainingTime)}
            </div>
            {generateImagePaymentMethod(state.data?.payment?.payment_method)}
            <div className='flex w-fit flex-col gap-y-2'>
              <h3 className='text-base font-bold text-black'>
                How to Pay with {state.data?.payment?.payment_method} :
              </h3>
              <ol className='list-inside list-decimal'>
                <li className='text-sm font-medium text-black'>
                  Open {state.data?.payment?.payment_method} application
                </li>
                <li className='text-sm font-medium text-black'>
                  Click "Pay" and scan the QR code above
                </li>
                <li className='text-sm font-medium text-black'>
                  Check payment detail, then click "Confirm and Pay" button
                </li>
                <li className='text-sm font-medium text-black'>
                  Please input your {state.data?.payment?.payment_method} PIN
                </li>
                <li className='text-sm font-medium text-black'>
                  Payment done and click "Confirm Payment" below
                </li>
              </ol>
            </div>
          </div>
        </DialogDescription>
        <Separator className='!my-0' />
        <Button
          className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
          onClick={() =>
            typeof onNextStepWallet === 'function' && onNextStepWallet()
          }
        >
          CONFIRM PAYMENT
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentOrderStatusPayin
