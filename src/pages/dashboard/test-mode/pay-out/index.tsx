/* eslint-disable react-hooks/exhaustive-deps */
import { IconArrowLeft } from '@tabler/icons-react'

import dayjs from 'dayjs'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Link, useNavigate } from 'react-router-dom'
import PayoutMethod from '@/components/partials/dashboard/test-mode/pay-out/payout-method'
import WithdrawInformation from '@/components/partials/dashboard/test-mode/pay-out/withdraw-information'
import useCheckout from '@/store/use-checkout'
import { cn } from '@/lib/utils'
import Stepper from '@/components/custom/stepper'
import PaymentReview from '@/components/partials/dashboard/test-mode/pay-out/payment-review'
import { useEffect, useState } from 'react'
import usePostData from '@/hooks/use-post-data'
import OrderStatus from '@/components/partials/dashboard/test-mode/pay-in/order-status'

export default function PayOut() {
  const navigate = useNavigate()

  const state = useCheckout((state) => state)

  const generateSecondsByPaymentType = (paymentMethod: string) => {
    if (paymentMethod === 'Bank Transfer') {
      return 3600
    }
    if (paymentMethod === 'QRIS') {
      return 600
    }
    return 600
  }

  const [countdown, setCountdown] = useState(5)

  const [remainingTime, setRemainingTime] = useState(
    generateSecondsByPaymentType(state.data.payment?.payment_method)
  )

  useEffect(() => {
    if (
      remainingTime > 0 &&
      state?.data?.payment?.payment_method === 'Bank Transfer'
    ) {
      const timerId = setTimeout(
        () => setRemainingTime(remainingTime - 1),
        1000
      )
      return () => clearTimeout(timerId) // Cleanup the timer on component unmount
    }
    if (
      remainingTime > 0 &&
      state?.data?.payment?.payment_method === 'e-Wallet'
    ) {
      const timerId = setTimeout(
        () => setRemainingTime(remainingTime - 1),
        1000
      )
      return () => clearTimeout(timerId) // Cleanup the timer on component unmount
    }
  }, [remainingTime, state.data?.payment])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const CHECKOUT_STEPS = [
    {
      step: 1,
      name: 'Payout Method',
    },
    {
      step: 2,
      name: 'Payment Review',
    },
    {
      step: 3,
      name: 'Order Status',
    },
  ]

  const findCheckoutComp = CHECKOUT_STEPS?.find(
    (c) => c.step === state?.data?.step
  )

  const { isLoading: step1Loading, postData: postDataPayout } = usePostData(
    `${import.meta.env.VITE_APP_API_URL}/paybender-demo-insert/payout`,
    {
      token: '',
      onSuccess: () => {},
      onError: (err) => console.log({ err }),
    }
  )

  const { isLoading: step2Loading, postData: updateDataPayout } = usePostData(
    `${import.meta.env.VITE_APP_API_URL}/paybender-demo-update/payout`,
    {
      token: '',
      onError: (err) => console.log({ err }),
    }
  )

  const ActiveComponent = () => {
    switch (findCheckoutComp?.step) {
      case 1:
        return (
          <PayoutMethod
            onNextStep={(data?: {
              channel: string
              amount: number
              customerName: string
              customerPhone: string
              feeAmount: number
              customerEmail: string
            }) => {
              postDataPayout(data).then((res) => {
                state?.setStep(CHECKOUT_STEPS.length)
                state?.setCartData({
                  amount: data?.amount,
                  feeAmount: data?.feeAmount,
                })
                state.setPaymentData({
                  payment_method: data?.channel,
                  transactionId: (res as unknown as { transactionId: string })
                    ?.transactionId,
                })
                state?.setShippingData({
                  customer_name: data?.customerName,
                  customer_phone: data?.customerPhone,
                  customer_email: data?.customerEmail,
                })
              })
            }}
            isLoading={step1Loading}
          />
        )
      case 2:
        return (
          <PaymentReview
            remainingTime={remainingTime ? formatTime(remainingTime) : ''}
            onPaidTransaction={(v) => [
              updateDataPayout({
                transactionId: state.data.payment?.transactionId,
                status: v,
              }).then(() => {
                state?.setStep(CHECKOUT_STEPS.length)
                state.setPaymentData({ payment_date: new Date() })
                navigate('/get-started/test-mode/pay-out', {
                  state: {
                    status: v,
                  },
                })
              }),
            ]}
            isLoading={step2Loading}
          />
        )
      case 3:
        return <OrderStatus countdown={countdown} />

      default:
        break
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
      }
    }
  }, [state?.data?.step, countdown, navigate])

  return (
    <Layout className='bg-[#FAFAFB]'>
      {/* ===== Top Heading ===== */}
      <Layout.Header className='shadow-sm'>
        <Timestamp
          date={dayjs().format('dddd, MMMM DD, YYYY')}
          time={dayjs().format('HH:mm A')}
        />
        <div className='flex items-center ml-auto space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <Link
          to='/get-started/test-mode'
          className='mb-10 flex items-center gap-x-2 text-sm font-medium text-[#3CC1D1]'
        >
          <IconArrowLeft />
          Back
        </Link>
        <div className='mb-10 flex w-full flex-col items-center gap-x-[6.125rem] gap-y-10 lg:flex-row'>
          <h2 className='text-lg font-medium text-black'>Pay Out Demo</h2>
          <Stepper
            stepsConfig={CHECKOUT_STEPS}
            currentStep={state?.data?.step}
            isComplete={state?.data?.isComplete}
          />
        </div>
        <div className='flex gap-5'>
          <div
            className={cn('w-full', {
              'w-1/2': state?.data?.step === 1,
            })}
          >
            {ActiveComponent()}
          </div>
          {state?.data?.step === 1 && (
            <div className='w-1/2'>
              <WithdrawInformation />
            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}
