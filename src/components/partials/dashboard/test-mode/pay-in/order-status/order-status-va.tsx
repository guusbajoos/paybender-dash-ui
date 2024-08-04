import BCA from '@/assets/images/BCA.png'
import IconClipboard from '@/assets/images/icon-clipboard.png'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { copyTextToClipboard } from '@/lib/utils'
import { useEffect, useState } from 'react'

const OrderStatusVA = ({ countdown }: { countdown: number }) => {
  const [message, setMessage] = useState<string>('')

  const handleCopy = async () => {
    const text = await copyTextToClipboard('#Sample-Store-123121')
    setMessage(text)
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }, [message])

  return (
    <Card className='p-6'>
      <h2 className='text-center text-lg font-medium text-black lg:text-2xl'>
        Finish the Payment Before
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      <div className='flex flex-col gap-y-2.5'>
        <p className='text-center text-base font-medium text-[#EFC100] lg:text-lg'>
          23:58:59
        </p>
        <p className='text-center text-sm text-[#5A5A5A]'>Payment due to</p>
        <p className='text-center text-base text-[#5A5A5A] lg:text-lg'>
          Thursday, 25 July 2024 15:12
        </p>
      </div>
      <div className='mt-4 flex flex-col gap-y-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            BCA Virtual Account
          </span>
          <img src={BCA} alt='BCA' className='h-auto w-[94px] object-contain' />
        </div>
        {message && (
          <span className='w-full rounded-sm bg-[#3cc1d1] px-2 py-1 text-xs text-white'>
            {message}
          </span>
        )}
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            927472426665658265
          </span>
          <span className='flex items-center gap-2 text-sm font-normal text-[#121212] lg:text-lg'>
            Copy
            <img
              src={IconClipboard}
              alt='Copy'
              className='size-5'
              onClick={handleCopy}
            />
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            Payment amount
          </span>
          <span className='text-sm font-normal text-[#121212] lg:text-lg'>
            IDR 300.000
          </span>
        </div>
      </div>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='text-center text-sm font-normal text-[#5A5A5A] lg:text-lg'>
        Redirect in {countdown} seconds or click here
      </p>
    </Card>
  )
}

export default OrderStatusVA
