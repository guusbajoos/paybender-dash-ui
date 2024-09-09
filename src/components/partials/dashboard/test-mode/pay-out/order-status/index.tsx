import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currencyFormatter } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
import dayjs from 'dayjs'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const OrderStatus = ({ countdown }: { countdown: number }) => {
  const navigate = useNavigate()
  const state = useCheckout((state) => state)
  const location = useLocation()

  const path = location.pathname.split('/')[3]

  if (countdown === 0) {
    state.removeState()
    navigate('/app/get-started/test-mode', {
      state: {
        testMode: path,
      },
    })
  }

  return (
    <Card className='p-6'>
      <h2 className='text-center text-lg font-medium text-black lg:text-2xl'>
        {location.state?.status === 'completed'
          ? 'Thank You for Your Withdrawal!'
          : 'Your Withdrawal is Failed'}
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      {/* <p className='mb-4 text-center text-base text-[#5A5A5A] lg:text-lg'> */}
      {/* Beware of fraudulent payment requests! */}
      {/* </p> */}
      <div className='flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Withdrawal Amount
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data?.cart?.amount
              ? currencyFormatter(state.data?.cart?.amount, 'IDR')
              : '-'}
          </span>
        </div>
        {location.state?.status === 'completed' && (
          <div className='flex items-center justify-between'>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              Withdrawal Timestamp
            </span>
            <span className='text-sm font-normal text-[#121212] lg:text-lg'>
              {state.data?.payment?.payment_date
                ? dayjs(state.data?.payment?.payment_date).format(
                    'dddd, MMMM DD, YYYY, hh:mm:ss A'
                  )
                : ''}
            </span>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Withdrawal Channel
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data?.payment?.payment_method || '-'}
          </span>
        </div>
      </div>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='text-center text-sm font-normal text-[#5A5A5A] lg:text-lg'>
        Redirect in {countdown} seconds or{' '}
        <Link className='font-medium' to='/app/get-started/test-mode'>
          click here
        </Link>
      </p>
    </Card>
  )
}

export default OrderStatus
