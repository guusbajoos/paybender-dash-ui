import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currencyFormatter } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const PaymentReviewTF = ({
  // remainingTime,
  onPaidTransaction,
  isLoading,
}: {
  // remainingTime: string
  onPaidTransaction: (v: 'failed' | 'completed') => void
  isLoading?: boolean
}) => {
  const state = useCheckout((state) => state)

  // const navigate = useNavigate()

  // const [date] = useState<Date>(() => {
  //   const futureDate = new Date()
  //   futureDate.setSeconds(futureDate.getSeconds() + 600) // Add 600 seconds (10 minutes)
  //   return futureDate
  // })

  // const datePaid = (date: Date): string => {
  //   const options = {
  //     year: 'numeric' as const,
  //     month: 'long' as const,
  //     day: 'numeric' as const,
  //     hour: '2-digit' as const,
  //     minute: '2-digit' as const,
  //     second: '2-digit' as const,
  //   }

  //   return date.toLocaleDateString(undefined, options)
  // }

  // if remaining time is done, redirect to the test mode page
  // if (remainingTime === '00:00') {
  //   navigate('/get-started/test-mode')
  //   state.removeState()
  // }

  return (
    <Card className='p-6'>
      <h2 className='text-center text-lg font-medium text-black lg:text-2xl'>
        Withdrawal Review
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />

      {/* <div className='flex flex-col gap-y-2.5'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='text-center text-base font-medium text-[#EFC100] lg:text-lg'>
            Remaining Time
          </h3>
          <h5 className='text-lg font-bold text-center text-black lg:text-2xl'>
            {remainingTime}
          </h5>
        </div>
      </div> */}

      <div className='mt-4 flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Withdraw Channel
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data.payment?.payment_method}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Withdrawal Amount
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {currencyFormatter(state.data.cart?.amount, 'IDR')}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Receiver Account Name
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data.shipping?.customer_name}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Receiver Account Number
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data.shipping?.customer_phone}
          </span>
        </div>
      </div>

      <Separator className='my-4 text-[#C7C7C7]' />

      <div className='flex flex-col gap-y-4'>
        <Button
          className='w-full bg-[#4ed974] font-medium text-white hover:bg-[#4ed974]/90 focus:bg-[#4ed974]/90'
          onClick={() => onPaidTransaction('completed')}
          disabled={isLoading}
        >
          {isLoading ? 'Processing' : 'PROCEED WITHDRAWAL'}
        </Button>
        <Button
          className='w-full bg-[#e85d72] font-medium text-white hover:bg-[#e85d72]/90 focus:bg-[#e85d72]/90'
          onClick={() => onPaidTransaction('failed')}
          disabled={isLoading}
        >
          {isLoading ? 'Processing' : 'CANCEL WITHDRAWAL'}
        </Button>
      </div>
    </Card>
  )
}

export default PaymentReviewTF
