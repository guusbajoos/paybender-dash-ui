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
import usePostData from '@/hooks/use-post-data'
import MemoizedWithdrawPayinLoading from '@/components/partials/dashboard/test-mode/pay-in/withdraw-loading'
import MemoizedPaymentReviewDialog from '@/components/partials/dashboard/test-mode/pay-in/payment-review-dialog'
import MemoizedWithdrawConfirmPayin from '@/components/partials/dashboard/test-mode/pay-in/withdraw-confirm'

export default function PayIn() {
  const navigate = useNavigate()

  const state = useCheckout((state) => state)

  const generateSecondsByPaymentType = (paymentType: string) => {
    if (paymentType === 'VA') {
      return 3600 // 1h minutes
    }
    if (paymentType === 'QRIS' || paymentType === 'E-Money') {
      return 600 // 10 minutes
    }

    return 600
  }

  const [countdown, setCountdown] = useState(5)

  const [remainingTime, setRemainingTime] = useState(
    generateSecondsByPaymentType(state.data.payment?.payment_type)
  )
  const [isOpenProgressLoading, setIsOpenProgressLoading] = useState(false)
  const [isOpenWithdrawStatus, setIsOpenWithdrawStatus] = useState(false)
  const [isOpenPaymentReviewDialog, setIsOpenPaymentReviewDialog] =
    useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [progressConfirmPayment, setProgressConfirmPayment] = useState(0)
  const [isCompleteConfirmPayment, setIsCompleteConfirmPayment] =
    useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

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

  const { isLoading: step1Loading, postData: postDataPayin } = usePostData(
    `${import.meta.env.VITE_APP_API_URL}/paybender-demo-insert/payin`,
    {
      token: '',
      onSuccess: () => {},
      onError: (err) => console.log({ err }),
    }
  )

  const { isLoading: step2Loading, postData: updateDataPayin } = usePostData(
    `${import.meta.env.VITE_APP_API_URL}/paybender-demo-update/payin`,
    {
      token: '',
      onError: (err) => console.log({ err }),
    }
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
            onNextStep={(v) => {
              postDataPayin({
                channel: v.payment_method,
                amount: state.data.cart?.amount,
                feeAmount: state.data.cart?.feeAmount,
                customerName: `${state.data.shipping?.first_name} ${state.data.shipping?.last_name}`,
                customerEmail: state.data.shipping?.email,
                customerPhone: state.data.shipping?.phone_number,
                shippingCourier: state.data.shipping?.shipping_method,
                shippingService: state.data.shipping?.shipping_service,
              }).then((res) => {
                state.setPaymentData({
                  transactionId: (res as unknown as { transactionId: string })
                    ?.transactionId,
                })
                state?.setStep(CHECKOUT_STEPS.length)
              })
            }}
            onPaymentMethodChange={(v) => state.setPaymentData(v)}
            payment_method={state.data.payment?.payment_method}
            isLoading={step1Loading}
          />
        )
      case 3:
        return (
          <>
            <PaymemtReview
              remainingTime={remainingTime ? formatTime(remainingTime) : ''}
              onPaidTransaction={(v) => [
                updateDataPayin({
                  transactionId: state.data.payment?.transactionId,
                  status: v,
                }).then(() => {
                  if (
                    state.data?.payment?.payment_type === 'E-Money' &&
                    ['DANA', 'LinkAja', 'OVO'].includes(
                      state.data?.payment?.payment_method
                    ) &&
                    v === 'completed'
                  ) {
                    setIsOpenProgressLoading(true)
                  } else {
                    state.setStep(CHECKOUT_STEPS.length)
                  }
                  state.setPaymentData({ payment_date: new Date() })
                  navigate('/get-started/test-mode/pay-in', {
                    state: {
                      status: v,
                    },
                  })
                }),
              ]}
              isLoading={step2Loading}
            />
            <MemoizedWithdrawPayinLoading
              isOpen={isOpenProgressLoading}
              onNextPage={() => {
                setIsOpenProgressLoading(false)
                setIsComplete(false)
                setIsOpenPaymentReviewDialog(true)
              }}
              setProgress={setProgress}
              progress={progress}
              isComplete={isComplete}
              setComplete={setIsComplete}
              step={state.data?.step}
            />
            <MemoizedPaymentReviewDialog
              step={state.data?.stepWallet}
              isOpen={isOpenPaymentReviewDialog}
              onNextStepWallet={() => {
                state.setStepWallet()
                if (state.data?.stepWallet === 2) {
                  setIsOpenPaymentReviewDialog(false)
                  setIsOpenWithdrawStatus(true)
                }
              }}
            />
            <MemoizedWithdrawConfirmPayin
              isOpen={isOpenWithdrawStatus}
              onNextPage={() => {
                setIsOpenWithdrawStatus(false)
                setIsCompleteConfirmPayment(false)
                state.setStep(CHECKOUT_STEPS.length)
              }}
              setProgress={setProgressConfirmPayment}
              progress={progressConfirmPayment}
              isComplete={isCompleteConfirmPayment}
              setComplete={setIsCompleteConfirmPayment}
              step={state.data?.stepWallet}
            />
          </>
        )
      case 4:
        return <OrderStatus countdown={countdown} />
      default:
        return <></>
    }
  }

  useEffect(() => {
    if (
      remainingTime > 0 &&
      state?.data?.step === 3 &&
      ['QRIS'].includes(state.data?.payment?.payment_type)
    ) {
      const timerId = setTimeout(
        () => setRemainingTime(remainingTime - 1),
        1000
      )
      return () => clearTimeout(timerId) // Cleanup the timer on component unmount
    }
    if (
      remainingTime > 0 &&
      state?.data?.step === 3 &&
      state?.data?.payment?.payment_type === 'VA' &&
      [
        'BCA Virtual Account',
        'Mandiri Virtual Account',
        'BRI Virtual Account',
        'BNI Virtual Account',
        'BSI Virtual Account',
        'CIMBNiaga Virtual Account',
        'Permata Virtual Account',
      ].includes(state.data?.payment?.payment_method)
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
            <CartReview />
          </div>
          <div className='w-full lg:w-1/2'>{ActiveComponetn()}</div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
