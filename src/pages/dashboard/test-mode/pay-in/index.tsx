/* eslint-disable react-hooks/exhaustive-deps */
import { IconArrowLeft } from '@tabler/icons-react'

import dayjs from 'dayjs'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Link, useNavigate } from 'react-router-dom'
import CartReview from '@/components/partials/dashboard/test-mode/pay-in/cart'
import ContactInformation from '@/components/partials/dashboard/test-mode/pay-in/contact-information'
import SelectPayment from '@/components/partials/dashboard/test-mode/pay-in/select-payment'
import OrderStatus from '@/components/partials/dashboard/test-mode/pay-in/order-status'
import Stepper from '@/components/custom/stepper'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
import PaymemtReview from '@/components/partials/dashboard/test-mode/pay-in/payment-review'

// import OrderStatusPaid from '@/components/partials/dashboard/test-mode/pay-in/order-status/order-status-paid'

export default function PayIn() {
  const navigate = useNavigate()

  const state = useCheckout((state) => state)

  const [countdown, setCountdown] = useState(5)

  const CHECKOUT_STEPS = [
    {
      step: 1,
      name: 'Review Cart',
    },
    {
      step: 2,
      name: 'Select Payment',
    },
    {
      step: 3,
      name: 'Payment Review',
    },
    {
      step: 4,
      name: 'Order Status',
    },
  ]

  const findCheckoutComp = CHECKOUT_STEPS?.find(
    (c) => c.step === state?.data?.step
  )

  const ActiveComponetn = () => {
    switch (findCheckoutComp?.step) {
      case 1:
        return (
          <ContactInformation
            onNextStep={(v) => {
              state?.setStep(CHECKOUT_STEPS.length)
              state?.setCartData({
                amount: 250000,
                feeAmount: 22500,
              })
              state?.setShippingData(v)
            }}
          />
        )
      case 2:
        return (
          <SelectPayment
            onNextStep={() => {
              state?.setStep(CHECKOUT_STEPS.length)
            }}
            onPaymentMethodChange={(v) => state.setPaymentData(v)}
            payment_method={state.data.payment?.payment_method}
          />
        )
      case 3:
        return <PaymemtReview />
      case 4:
        return <OrderStatus countdown={countdown} />
      default:
        return <></>
    }
  }

  useEffect(() => {
    if (state?.data?.step === CHECKOUT_STEPS.length) {
      if (countdown !== 0) {
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1)
        }, 1000)

        return () => {
          clearInterval(interval)
        }
      } else {
        navigate('/get-started/test-mode')
      }
    }
  }, [state?.data?.step, countdown, navigate])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header className='shadow-sm'>
        <Timestamp
          date={dayjs().format('dddd, MMMM DD, YYYY')}
          time={dayjs().format('HH:mm A')}
        />
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <Link
          to='/get-started/test-mode'
          className='mb-10 flex items-center gap-x-2 text-sm font-medium text-[#3CC1D1]'
          onClick={() => state.removeState()}
        >
          <IconArrowLeft />
          Back
        </Link>
        <div className='mb-10 flex w-full flex-col items-center gap-x-[6.125rem] gap-y-10 lg:flex-row'>
          <h2 className='text-lg font-medium text-black'>Pay In Demo</h2>
          <Stepper
            stepsConfig={CHECKOUT_STEPS}
            currentStep={state?.data?.step}
            isComplete={state?.data?.isComplete}
          />
        </div>
        <div
          className={cn('flex flex-col gap-5 lg:flex-row', {
            'items-center': state?.data?.step === CHECKOUT_STEPS.length,
          })}
        >
          <div className='w-full lg:w-1/2'>
            <CartReview currentStep={state?.data?.step} />
          </div>
          <div className='w-full lg:w-1/2'>{ActiveComponetn()}</div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
