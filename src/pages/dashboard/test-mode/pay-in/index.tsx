import { IconArrowLeft } from '@tabler/icons-react'

import dayjs from 'dayjs'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Link } from 'react-router-dom'
import CartReview from '@/components/partials/dashboard/test-mode/pay-in/cart'
import ContactInformation from '@/components/partials/dashboard/test-mode/pay-in/contact-information'
// import SelectPayment from '@/components/partials/dashboard/test-mode/pay-in/select-payment'
// import OrderStatus from '@/components/partials/dashboard/test-mode/pay-in/order-status'

// import OrderStatusPaid from '@/components/partials/dashboard/test-mode/pay-in/order-status/order-status-paid'

export default function PayIn() {
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
        <div className='flex w-full items-center justify-start gap-x-[6.125rem]'>
          <h2 className='mb-10 text-lg font-medium text-black'>Pay In Demo</h2>
          <div className=''>stepper</div>
        </div>
        <div className='flex gap-5'>
          <div className='w-1/2'>
            <CartReview />
          </div>
          <div className='w-1/2'>
            <ContactInformation />
            {/* <SelectPayment /> */}
            {/* <OrderStatus /> */}
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
