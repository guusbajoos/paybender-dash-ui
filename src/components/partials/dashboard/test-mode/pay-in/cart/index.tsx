import { useEffect, useState } from 'react'

import PaybenderLogo from '@/assets/images/paybender-logo.png'
import ProductOne from '@/assets/images/product-1.png'
import IconClipboard from '@/assets/images/icon-clipboard.png'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { copyTextToClipboard } from '@/lib/utils'

const CartReview = ({ currentStep }: { currentStep: number }) => {
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
          <h4 className='text-lg font-medium text-[#121212]'>Demo Shop</h4>
        </div>
        <div className='flex flex-col gap-y-[30px]'>
          <h2 className='text-base font-normal text-[#121212] lg:text-lg'>
            Review Your Order (2 items)
          </h2>
          <div className='flex flex-col gap-y-2.5'>
            <h3 className='text-2xl font-medium text-[#121212] lg:text-3xl'>
              Total Payment
            </h3>
            <h4 className='text-2xl font-medium text-[#121212] lg:text-3xl'>
              IDR 250.000
            </h4>
          </div>
          <div className='flex gap-x-[1.125rem]'>
            <div className='h-[150px] min-w-[125px] overflow-hidden rounded-xl'>
              <img
                src={ProductOne}
                alt='Product 1'
                className='size-full object-cover'
              />
            </div>
            <div className='flex h-full flex-wrap gap-x-[1.125rem] gap-y-3'>
              <h3 className='text-sm'>Basic T-Shirt - Grey</h3>
              <div className='flex flex-col gap-y-3'>
                <h3 className='text-sm font-medium text-black/30'>Quantity</h3>
                <Input
                  type='number'
                  defaultValue={1}
                  min={1}
                  className='w-[111px]'
                  disabled={currentStep !== 1}
                />
              </div>
              <h3 className='text-sm'>IDR 150.000</h3>
            </div>
          </div>
          <div className='flex gap-x-[1.125rem]'>
            <div className='h-[150px] min-w-[125px] overflow-hidden rounded-xl'>
              <img
                src={ProductOne}
                alt='Product 1'
                className='size-full object-cover'
              />
            </div>
            <div className='flex h-full flex-wrap gap-x-[1.125rem] gap-y-3'>
              <h3 className='text-sm'>Basic T-Shirt - Grey</h3>
              <div className='flex flex-col gap-y-3'>
                <h3 className='text-sm font-medium text-black/30'>Quantity</h3>
                <Input
                  type='number'
                  defaultValue={1}
                  min={1}
                  className='w-[111px]'
                  disabled={currentStep !== 1}
                />
              </div>
              <h3 className='text-sm'>IDR 150.000</h3>
            </div>
          </div>
          <div className='flex flex-col gap-y-1'>
            <h3 className='w-fit text-base font-normal text-[#121212] lg:text-lg'>
              Order ID :
            </h3>
            <div className='relative flex flex-col items-center gap-x-4'>
              {message && (
                <div className='mb-1 w-full'>
                  <span className='rounded-sm bg-[#3cc1d1] px-2 py-1 text-xs text-white'>
                    {message}
                  </span>
                </div>
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
              <h3 className='sm-base font-normal text-[#121212] lg:text-lg'>
                IDR 250.000
              </h3>
            </div>
            <div className='flex justify-between'>
              <h3 className='sm-base font-normal text-[#121212] lg:text-lg'>
                Admin Fee
              </h3>
              <h3 className='sm-base font-normal text-[#121212] lg:text-lg'>
                IDR 22.500
              </h3>
            </div>
            <div className='flex justify-between'>
              <h3 className='text-sm font-normal text-[#121212] lg:text-lg'>
                Tax Service 11%
              </h3>
              <h3 className='text-sm font-normal text-[#121212] lg:text-lg'>
                IDR 27.500
              </h3>
            </div>
            {/*             <div className='flex justify-between'> */}
            {/*               <h3 className='text-sm lg:text-lg font-normal text-[#121212]'> */}
            {/*                 Shipping Free */}
            {/*               </h3> */}
            {/*               <h3 className='text-sm lg:text-lg font-normal text-[#121212]'>IDR 0</h3> */}
            {/*             </div> */}
            <Separator className='my-2.5 text-[#E0E0E0]' />
            <div className='flex justify-between'>
              <h3 className='sm-base font-normal text-[#121212] lg:text-lg'>
                Subtotal
              </h3>
              <h3 className='sm-base font-normal text-[#121212] lg:text-lg'>
                IDR 300.000
              </h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CartReview
