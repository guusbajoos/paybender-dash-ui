/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconArrowLeft } from '@tabler/icons-react'

import { Link, useNavigate } from 'react-router-dom'
import PayoutMethod from '@/components/partials/dashboard/test-mode/pay-out/payout-method'
import WithdrawInformation from '@/components/partials/dashboard/test-mode/pay-out/withdraw-information'
import useCheckout from '@/store/use-checkout'
import { cn } from '@/lib/utils'
import Stepper from '@/components/custom/stepper'
import PaymentReview from '@/components/partials/dashboard/test-mode/pay-out/payment-review'
import { useEffect, useState } from 'react'
import usePostData from '@/hooks/use-post-data'
import OrderStatus from '@/components/partials/dashboard/test-mode/pay-out/order-status'
import WithdrawLoading from '@/components/partials/dashboard/test-mode/pay-out/withdraw-loading'

export default function PayOut() {
  const navigate = useNavigate()

  const state = useCheckout((state) => state)

  const generateSecondsByPaymentType = (payment_type: string) => {
    if (payment_type === 'Bank Transfer') {
      return 3600
    }
    if (payment_type === 'e-Wallet') {
      return 600
    }
    return 600
  }

  const [countdown, setCountdown] = useState(5)
  const [remainingTime, setRemainingTime] = useState(
    generateSecondsByPaymentType(state.data.payment?.payment_type)
  )
  const [isOpenProgressLoading, setIsOpenProgressLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

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
      name: 'Withdrawal Review',
    },
    {
      step: 3,
      name: 'Withdrawal Status',
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
              channel_method: string
              channel: string
              amount: number
              customerName: string
              customerPhone: string
              feeAmount: number
              customerEmail: string
            }) => {
              const { channel_method, ...rest } = data ?? {}

              postDataPayout(rest).then((res) => {
                state?.setStep(CHECKOUT_STEPS.length)
                state?.setCartData({
                  amount: data?.amount,
                  feeAmount: data?.feeAmount,
                })
                state.setPaymentData({
                  payment_type: data?.channel_method,
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
          <>
            <PaymentReview
              remainingTime={remainingTime ? formatTime(remainingTime) : ''}
              onPaidTransaction={(v) => [
                updateDataPayout({
                  transactionId: state.data.payment?.transactionId,
                  status: v,
                }).then(() => {
                  setIsOpenProgressLoading(true)
                  state.setPaymentData({ payment_date: new Date() })
                  navigate('/app/get-started/test-mode/pay-out', {
                    state: {
                      status: v,
                    },
                  })
                }),
              ]}
              isLoading={step2Loading}
            />
            <WithdrawLoading
              isOpen={isOpenProgressLoading}
              onNextPage={() => {
                state?.setStep(CHECKOUT_STEPS.length)
                setIsOpenProgressLoading(false)
                setIsComplete(false)
              }}
              setProgress={setProgress}
              progress={progress}
              isComplete={isComplete}
              setComplete={setIsComplete}
              step={state.data?.step}
            />
          </>
        )
      case 3:
        return <OrderStatus countdown={countdown} />

      default:
        break
    }
  }

  useEffect(() => {
    if (
      remainingTime > 0 &&
      state.data?.step === 2 &&
      state?.data?.payment?.payment_type === 'Bank Transfer'
    ) {
      const timerId = setTimeout(
        () => setRemainingTime(remainingTime - 1),
        1000
      )
      return () => clearTimeout(timerId) // Cleanup the timer on component unmount
    }
    if (
      remainingTime > 0 &&
      state.data?.step === 2 &&
      state?.data?.payment?.payment_type === 'e-Wallet'
    ) {
      const timerId = setTimeout(
        () => setRemainingTime(remainingTime - 1),
        1000
      )
      return () => clearTimeout(timerId) // Cleanup the timer on component unmount
    }
  }, [remainingTime, state.data?.step, state.data?.payment])

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
  }, [state?.data?.step, countdown])

  return (
    <>
      <Link
        to='/app/get-started/test-mode'
        className='mb-10 flex items-center gap-x-2 text-sm font-medium text-[#3CC1D1]'
        onClick={() => state.removeState()}
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
    </>
  )
}
