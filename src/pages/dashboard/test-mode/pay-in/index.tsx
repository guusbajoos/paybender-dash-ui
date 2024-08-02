import { IconArrowLeft } from '@tabler/icons-react'

import dayjs from 'dayjs'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Link } from 'react-router-dom'
import CartReview from '@/components/partials/dashboard/test-mode/pay-in/cart'
import ContactInformation from '@/components/partials/dashboard/test-mode/pay-in/contact-information'
import SelectPayment from '@/components/partials/dashboard/test-mode/pay-in/select-payment'
import OrderStatus from '@/components/partials/dashboard/test-mode/pay-in/order-status'
import Stepper from '@/components/custom/stepper'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// import OrderStatusPaid from '@/components/partials/dashboard/test-mode/pay-in/order-status/order-status-paid'

export default function PayIn() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

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

  console.log(currentStep, 'currentStep')

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
      Component: () => <OrderStatus />,
    },
  ]

  const ActiveComponent = CHECKOUT_STEPS[currentStep - 1]?.Component

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
        <div className='mb-10 flex w-full items-center justify-start gap-x-[6.125rem]'>
          <h2 className='text-lg font-medium text-black'>Pay In Demo</h2>
          <Stepper
            stepsConfig={CHECKOUT_STEPS}
            currentStep={currentStep}
            isComplete={isComplete}
          />
        </div>
        <div
          className={cn('flex gap-5', {
            'items-center': currentStep === 3,
          })}
        >
          <div className='w-1/2'>
            <CartReview />
          </div>
          <div className='w-1/2'>
            <ActiveComponent />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
