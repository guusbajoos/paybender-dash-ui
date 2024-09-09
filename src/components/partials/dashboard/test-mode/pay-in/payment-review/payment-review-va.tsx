// import BCA from '@/assets/images/BCA.png'
// import BNI from '@/assets/images/BNI.png'
// import BRI from '@/assets/images/BRI.png'
// import BSI from '@/assets/images/BSI.png'
// import CIMBNiaga from '@/assets/images/CIMB Niaga.png'
// import MANDIRI from '@/assets/images/MANDIRI.png'
// import Permata from '@/assets/images/Permata.png'
import IconClipboard from '@/assets/images/icon-clipboard.png'
import { Button } from '@/components/ui/button'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { copyTextToClipboard, currencyFormatter } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentReviewVA = ({
  remainingTime,
  onPaidTransaction,
  isLoading,
}: {
  remainingTime: string
  onPaidTransaction: (v: 'failed' | 'completed') => void
  isLoading?: boolean
}) => {
  const state = useCheckout((state) => state)
  const [message, setMessage] = useState<string>('')

  const navigate = useNavigate()

  const [date] = useState<Date>(() => {
    const futureDate = new Date()
    futureDate.setSeconds(futureDate.getSeconds() + 600) // Add 600 seconds (10 minutes)
    return futureDate
  })

  const datePaid = (date: Date): string => {
    const options = {
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      second: '2-digit' as const,
    }

    return date.toLocaleDateString(undefined, options)
  }

  const handleCopy = async () => {
    const text = await copyTextToClipboard('927472426665658265')
    setMessage(text)
  }

  // const generateImagePaymentMethod = (paymentMethod: string) => {
  //   switch (paymentMethod) {
  //     case 'BCA Virtual Account':
  //       return (
  //         <img src={BCA} alt='BCA' className='h-auto w-[94px] object-contain' />
  //       )

  //     case 'BNI Virtual Account':
  //       return (
  //         <img src={BNI} alt='BNI' className='h-auto w-[94px] object-contain' />
  //       )

  //     case 'BRI Virtual Account':
  //       return (
  //         <img src={BRI} alt='BRI' className='h-auto w-[94px] object-contain' />
  //       )

  //     case 'BSI Virtual Account':
  //       return (
  //         <img src={BSI} alt='BSI' className='h-auto w-[94px] object-contain' />
  //       )

  //     case 'CIMBNiaga Virtual Account':
  //       return (
  //         <img
  //           src={CIMBNiaga}
  //           alt='BCA'
  //           className='h-auto w-[94px] object-contain'
  //         />
  //       )

  //     case 'Mandiri Virtual Account':
  //       return (
  //         <img
  //           src={MANDIRI}
  //           alt='BCA'
  //           className='h-auto w-[94px] object-contain'
  //         />
  //       )

  //     case 'Permata Virtual Account':
  //       return (
  //         <img
  //           src={Permata}
  //           alt='BCA'
  //           className='h-auto w-[94px] object-contain'
  //         />
  //       )

  //     default:
  //       return <></>
  //   }
  // }

  // if remaining time is done, redirect to the test mode page
  if (remainingTime === '00:00') {
    navigate('/app/get-started/test-mode')
    state.removeState()
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }, [message])

  return (
    <Card className='p-6'>
      <div className='flex flex-col gap-y-4'>
        <CardTitle className='text-center text-lg font-medium text-black lg:text-2xl'>
          Payment Review
        </CardTitle>
        <CardDescription className='mb-4 text-center text-base text-[rgb(90,90,90)] lg:text-lg'>
          Beware of fraudulent payment requests!
        </CardDescription>
      </div>

      <Separator className='my-4 text-[#C7C7C7]' />

      <div className='flex flex-col gap-y-2.5'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='text-center text-base font-medium text-[#EFC100] lg:text-lg'>
            Remaining Time
          </h3>
          <h5 className='text-center text-lg font-bold text-black lg:text-2xl'>
            {remainingTime}
          </h5>
        </div>
        <p className='text-center text-sm text-[#5A5A5A]'>Payment due to</p>
        <p className='text-center text-base font-bold text-[#5A5A5A] lg:text-lg'>
          {datePaid(date)}
        </p>
      </div>

      <div className='mt-4 flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Payment Method
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data.payment?.payment_method}
          </span>
          {/* {generateImagePaymentMethod(state.data.payment?.payment_method)} */}
        </div>
        {message && (
          <span className='w-full rounded-sm bg-[#3cc1d1] px-2 py-1 text-xs text-white'>
            {message}
          </span>
        )}
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            VA Number
          </span>
          <span className='flex items-center gap-2 text-sm font-normal text-[#121212] lg:text-lg'>
            927472426665658265
            <img
              src={IconClipboard}
              alt='Copy'
              className='size-5'
              onClick={handleCopy}
            />
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
    </Card>
  )
}

export default PaymentReviewVA
