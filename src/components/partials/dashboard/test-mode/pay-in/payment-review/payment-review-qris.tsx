import QRIS from '@/assets/images/paybender-qris.png'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { currencyFormatter } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentReviewQRIS = ({
  remainingTime,
  onPaidTransaction,
  isLoading,
}: {
  remainingTime: string
  onPaidTransaction: (status: 'failed' | 'completed') => void
  isLoading?: boolean
}) => {
  const navigate = useNavigate()

  const state = useCheckout((state) => state)
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
  if (remainingTime === '00:00') {
    navigate('/get-started/test-mode')
    state.removeState()
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col gap-y-4'>
          <CardTitle className='text-center text-lg font-medium text-black lg:text-2xl'>
            Payment Review
          </CardTitle>
          <CardDescription className='mb-4 text-center text-base text-[rgb(90,90,90)] lg:text-lg'>
            Beware of fraudulent payment requests!
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-y-2.5'>
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-center text-base font-medium text-[#EFC100] lg:text-lg'>
              Remaining Time
            </h3>
            <h5 className='text-center text-lg font-bold text-black lg:text-2xl'>
              {remainingTime}
            </h5>
          </div>

          <img src={QRIS} alt='qris' className='size-full object-cover' />

          <div className='flex items-center justify-between'>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              Payment Reference No.
            </span>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              {state.data?.payment?.transactionId || '-'}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              Amount to be Paid
            </span>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              {currencyFormatter(state.data.cart?.amount, 'IDR')}
            </span>
          </div>
          {/*           <div className='flex items-center justify-between'> */}
          {/*             <span className='text-sm font-normal text-[#121212] lg:text-lg'> */}
          {/*               Date Paid */}
          {/*             </span> */}
          {/*             <span className='text-sm font-normal text-[#121212] lg:text-lg'> */}
          {/*               {datePaid(date)} */}
          {/*             </span> */}
          {/*           </div> */}
          <div className='flex items-center justify-between'>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              Payment Channel
            </span>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              {state.data.payment?.payment_method}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-y-4'>
        <Button
          className='w-full bg-[#4ed974] font-medium text-white hover:bg-[#4ed974]/90 focus:bg-[#4ed974]/90'
          onClick={() => onPaidTransaction('completed')}
          disabled={isLoading}
        >
          {isLoading ? 'Processing' : 'PAID THE TRANSACTION'}
        </Button>
        <Button
          className='w-full bg-[#e85d72] font-medium text-white hover:bg-[#e85d72]/90 focus:bg-[#e85d72]/90'
          onClick={() => onPaidTransaction('failed')}
          disabled={isLoading}
        >
          {isLoading ? 'Processing' : 'FAIL THE TRANSACTION'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PaymentReviewQRIS
