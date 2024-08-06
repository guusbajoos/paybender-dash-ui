/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from 'react'

import DANA from '@/assets/images/DANA.png'
import LinkAja from '@/assets/images/LinkAja.png'
import OVO from '@/assets/images/OVO.png'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
// import { Progress } from '@/components/ui/progress'
import useCheckout from '@/store/use-checkout'
import { useNavigate } from 'react-router-dom'
import { currencyFormatter } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const PaymentReviewEMoney = ({
  remainingTime,
  onPaidTransaction,
  isLoading,
}: {
  remainingTime: string
  onPaidTransaction: (v: 'failed' | 'completed') => void
  isLoading?: boolean
}) => {
  const navigate = useNavigate()
  const state = useCheckout((state) => state)
  // const [progress, setProgress] = useState(13)

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

  const generateImagePaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'DANA':
        return (
          <img
            src={DANA}
            alt='DANA'
            className='h-auto w-[94px] object-contain'
          />
        )

      case 'LinkAja':
        return (
          <img
            src={LinkAja}
            alt='LinkAja'
            className='h-auto w-[94px] object-contain'
          />
        )

      case 'OVO':
        return (
          <img src={OVO} alt='OVO' className='h-auto w-[94px] object-contain' />
        )

      default:
        return <></>
    }
  }

  // if remaining time is done, redirect to the test mode page
  if (remainingTime === '00:00') {
    navigate('/get-started/test-mode')
    state.removeState()
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500)
  //   return () => clearTimeout(timer)
  // }, [])

  // useEffect(() => {
  //   if (countdown === 0) {
  //     navigate('/get-started/test-mode')
  //     state.removeState()
  //   }
  // }, [countdown, navigate])

  return (
    <Card className='p-6'>
      {/* <h2 className='text-lg font-medium text-center text-black lg:text-2xl'> */}
      {/* Thanks for Using {state?.data?.payment?.payment_method} */}
      {/* </h2> */}

      <div className='flex flex-col gap-y-4'>
        <CardTitle className='text-center text-lg font-medium text-black lg:text-2xl'>
          Payment Review
        </CardTitle>
        <CardDescription className='mb-4 text-center text-base text-[rgb(90,90,90)] lg:text-lg'>
          Beware of fraudulent payment requests!
        </CardDescription>
      </div>

      <Separator className='my-4 text-[#C7C7C7]' />

      {/* <div className='flex flex-col gap-y-2.5'> */}
      {/* <p className='text-center text-base font-medium text-[#EFC100] lg:text-lg'> */}
      {/* {remainingTime} */}
      {/* </p> */}
      {/* <p className='text-center text-sm text-[#5A5A5A]'>Payment due to</p> */}
      {/* <p className='text-center text-base text-[#5A5A5A] lg:text-lg'> */}
      {/* {datePaid(date)} */}
      {/* </p> */}
      {/* </div> */}

      <div className='flex flex-col gap-y-2.5'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='text-center text-base font-medium text-[#EFC100] lg:text-lg'>
            Remaining Time
          </h3>
          <h5 className='text-center text-lg font-bold text-black lg:text-2xl'>
            {remainingTime}
          </h5>
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Amount to be Paid
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {currencyFormatter(state.data.cart?.amount, 'IDR')}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Payment Channel
          </span>
          {generateImagePaymentMethod(state.data.payment?.payment_method)}
        </div>

        {/* <div className='flex items-center justify-between'> */}
        {/* <span className='text-sm font-normal text-[#121212] lg:text-lg'> */}
        {/* Payment amount */}
        {/* </span> */}
        {/* <span className='text-sm font-normal text-[#121212] lg:text-lg'> */}
        {/* {currencyFormatter(state.data.cart?.amount, 'IDR')} */}
        {/* </span> */}
        {/* </div> */}
      </div>
      <Separator className='my-4 text-[#C7C7C7]' />
      <div className='flex flex-col gap-y-4'>
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
      </div>

      {/* <h2 className='text-lg font-medium text-center text-black lg:text-2xl'>
        Thanks for Using {state?.data?.payment?.payment_method}
      </h2> */}
      {/* <Separator className='my-4 text-[#C7C7C7]' /> */}
      {/* <p className='text-center text-sm text-[#5A5A5A] lg:text-lg'>
        You will be jump to {state?.data?.payment?.payment_method} Page
      </p> */}
      {/* <Progress value={progress} className='my-2.5 w-full bg-[#CFD6DC]' /> */}
      {/* <p className='text-center text-sm font-normal text-[#5A5A5A] lg:text-lg'>
        Please wait, redirecting in {countdown} seconds or click here
      </p> */}
    </Card>
  )
}

export default PaymentReviewEMoney
