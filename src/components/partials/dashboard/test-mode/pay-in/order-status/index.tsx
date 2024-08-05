import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currencyFormatter } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

const OrderStatus = ({ countdown }: { countdown: number }) => {
  const navigate = useNavigate()
  const state = useCheckout((state) => state)

  if (countdown === 0) {
    state.removeState()
    navigate('/get-started/test-mode')
  }

  return (
    <Card className='p-6'>
      <h2 className='text-lg font-medium text-center text-black lg:text-2xl'>
        Thank You for Your Order
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='mb-4 text-center text-base text-[#5A5A5A] lg:text-lg'>
        Beware of fraudulent payment requests!
      </p>
      <div className='flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Amount Paid
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data?.cart?.amount
              ? currencyFormatter(state.data?.cart?.amount, 'IDR')
              : 'N/A'}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Date Paid
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data?.payment?.payment_date
              ? dayjs(state.data?.payment?.payment_date).format(
                  'dddd, MMMM DD, YYYY A'
                )
              : ''}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Payment
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            {state.data?.payment?.payment_method || 'N/A'}
          </span>
        </div>
      </div>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='text-center text-sm font-normal text-[#5A5A5A] lg:text-lg'>
        Redirect in {countdown} seconds or{' '}
        <Link className='font-medium' to='/get-started/test-mode'>
          click here
        </Link>
      </p>
    </Card>
  )
}

export default OrderStatus
