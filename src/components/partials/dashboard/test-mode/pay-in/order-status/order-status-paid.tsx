import { useEffect, useState } from 'react'

import PaybenderLogo from '@/assets/images/paybender-logo.png'
import ProductOne from '@/assets/images/product-1.png'
import IconClipboard from '@/assets/images/icon-clipboard.png'

import { copyTextToClipboard } from '@/lib/utils'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const OrderStatusPaid = () => {
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
    <Card>
      <CardContent className='pt-6'>
        <div className='mb-7 flex flex-col gap-y-2.5'>
          <img
            src={PaybenderLogo}
            alt='Paybender Logo'
            className='w-[150px] object-cover'
          />
          <h4 className='text-base font-medium text-[#121212] lg:text-lg'>
            Demo Shop
          </h4>
        </div>
        <div className='flex flex-col gap-y-[30px]'>
          <p className='text-sm font-normal text-[#AEAEAE]'>
            Delivery: 26/07/2024
          </p>
          <h2 className='text-base font-normal text-[#121212] lg:text-lg'>
            Paid by Virtual Account
          </h2>
          <div className='flex items-center gap-x-[1.125rem]'>
            <div className='flex gap-x-[1.125rem]'>
              <div className='h-[150px] w-[125px] overflow-hidden rounded-xl'>
                <img
                  src={ProductOne}
                  alt='Product 1'
                  className='size-full object-cover'
                />
              </div>
              <div className='flex flex-col gap-y-4'>
                <h3>Basic T-Shirt</h3>
                <Input type='number' value='1' className='w-[111px]' />
                <h3>IDR 150.000</h3>
              </div>
            </div>
            <div className='flex gap-x-[1.125rem]'>
              <div className='h-[150px] w-[125px] overflow-hidden rounded-xl'>
                <img
                  src={ProductOne}
                  alt='Product 1'
                  className='size-full object-cover'
                />
              </div>
              <div className='flex flex-col gap-y-4'>
                <h3>Basic T-Shirt</h3>
                <Input type='number' value='1' className='w-[111px]' />
                <h3>IDR 150.000</h3>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-1'>
            <h3 className='w-fit text-base font-normal text-[#121212] lg:text-lg'>
              Order ID :
            </h3>
            <div className='relative flex items-center gap-x-4'>
              {message && (
                <span className='absolute -top-7 left-24 w-auto rounded-sm bg-[#3cc1d1] p-0.5 text-xs text-white'>
                  {message}
                </span>
              )}
              <div className='relative flex w-full items-center gap-x-2'>
                <span className='text-sm text-[#121212] lg:text-base'>
                  #Sample-Store-123121
                </span>
                <img
                  src={IconClipboard}
                  alt='Copy'
                  className='size-7 cursor-pointer'
                  onClick={handleCopy}
                />
              </div>
            </div>
          </div>
          <Separator className='text-[#E0E0E0]' />
          <div id='total-payment'>
            <div className='flex justify-between'>
              <h3 className='text-sm font-normal text-[#121212] lg:text-lg'>
                Subtotal
              </h3>
              <h3 className='text-sm font-normal text-[#121212] lg:text-lg'>
                IDR 300.000
              </h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderStatusPaid
