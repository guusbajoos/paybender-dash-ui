import BCA from '@/assets/images/BCA.png'
import IconClipboard from '@/assets/images/icon-clipboard.png'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const OrderStatusVA = () => {
  return (
    <Card className='p-6'>
      <h2 className='text-center text-2xl font-medium text-black'>
        Finish the Payment Before
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      <div className='flex flex-col gap-y-2.5'>
        <p className='text-center text-lg font-medium text-[#EFC100]'>
          23:58:59
        </p>
        <p className='text-center text-sm text-[#5A5A5A]'>Payment due to</p>
        <p className='text-center text-lg text-[#5A5A5A]'>
          Thursday, 25 July 2024 15:12
        </p>
      </div>
      <div className='mt-4 flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-normal text-[#121212]'>
            BCA Virtual Account
          </span>
          <img src={BCA} alt='BCA' className='h-auto w-[94px] object-contain' />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-normal text-[#121212]'>
            927472426665658265
          </span>
          <span className='flex items-center gap-2 text-lg font-normal text-[#121212]'>
            Copy
            <img src={IconClipboard} alt='Copy' className='size-5' />
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-normal text-[#121212]'>
            Payment amount
          </span>
          <span className='text-lg font-normal text-[#121212]'>
            IDR 300.000
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

export default OrderStatusVA
