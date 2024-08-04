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

// import OrderStatusPaid from '@/components/partials/dashboard/test-mode/pay-in/order-status/order-status-paid'

export default function PayIn() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [countdown, setCountdown] = useState(5)

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === CHECKOUT_STEPS.length) {
        setIsComplete(true)
        return prevStep
      } else {
        return prevStep + 1
      }
    })
  }

  const CHECKOUT_STEPS = [
    {
      name: 'Review Cart',
      Component: () => <ContactInformation onNextStep={handleNext} />,
    },
    {
      name: 'Select Payment',
      Component: () => <SelectPayment onNextStep={handleNext} />,
    },
    {
      name: 'Order Status',
      Component: () => <OrderStatus countdown={countdown} />,
    },
  ]

  const ActiveComponent = CHECKOUT_STEPS[currentStep - 1].Component

  useEffect(() => {
    if (currentStep === 3) {
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
  }, [currentStep, countdown, navigate])

  // Display countdown value in the JSX
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
        >
          <IconArrowLeft />
          Back
        </Link>
        <div className='mb-10 flex w-full flex-col items-center gap-x-[6.125rem] gap-y-10 lg:flex-row'>
          <h2 className='text-lg font-medium text-black'>Pay In Demo</h2>
          <Stepper
            stepsConfig={CHECKOUT_STEPS}
            currentStep={currentStep}
            isComplete={isComplete}
          />
        </div>
        <div
          className={cn('flex flex-col gap-5 lg:flex-row', {
            'items-center': currentStep === 3,
          })}
        >
          <div className='w-full lg:w-1/2'>
            <CartReview currentStep={currentStep} />
          </div>
          <div className='w-full lg:w-1/2'>
            <ActiveComponent />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
