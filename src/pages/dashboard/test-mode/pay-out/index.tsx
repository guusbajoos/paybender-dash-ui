import { IconArrowLeft } from '@tabler/icons-react'

import dayjs from 'dayjs'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Link, useNavigate } from 'react-router-dom'
import PayoutMethod from '@/components/partials/dashboard/test-mode/pay-out/payout-method'
import WithdrawInformation from '@/components/partials/dashboard/test-mode/pay-out/withdraw-information'

export default function PayOut() {
  const navigate = useNavigate()

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
          <h2 className='text-lg font-medium text-black'>Pay Out Demo</h2>
        </div>
        <div className='flex gap-5'>
          <div className='w-1/2'>
            <PayoutMethod
              onDirect={() =>
                navigate('/get-started/test-mode', {
                  state: {
                    testMode: 'pay-out',
                  },
                })
              }
            />
          </div>
          <div className='w-1/2'>
            <WithdrawInformation />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
