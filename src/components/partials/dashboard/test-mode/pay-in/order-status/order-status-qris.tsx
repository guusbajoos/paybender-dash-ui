import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const OrderStatusQRIS = () => {
  return (
    <Card className='p-6'>
      <h2 className='text-center text-2xl font-medium text-black'>
        Thank You for Your Order
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='mb-4 text-center text-lg text-[#5A5A5A]'>
        Beware of fraudulent payment requests!
      </p>
      <div className='flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-normal text-[#121212]'>
            Amount Paid
          </span>
          <span className='text-lg font-normal text-[#121212]'>
            IDR 300.000
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-normal text-[#121212]'>Date Paid</span>
          <span className='text-lg font-normal text-[#121212]'>02/08/2024 11:23:00 PM</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-normal text-[#121212]'>Payment</span>
          <span className='text-lg font-normal text-[#121212]'>
            BCA Virtual Account
          </span>
        </div>
      </div>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='text-center text-lg font-normal text-[#5A5A5A]'>
        Redirect in 5 second or click here
      </p>
    </Card>
  )
}

export default OrderStatusQRIS
