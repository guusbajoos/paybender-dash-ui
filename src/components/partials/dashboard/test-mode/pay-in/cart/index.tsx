import PaybenderLogo from '@/assets/images/paybender-logo.png'
import ProductOne from '@/assets/images/product-1.png'
import IconClipboard from '@/assets/images/icon-clipboard.png'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const CartReview = () => {
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
          <h2 className='text-lg font-normal text-[#121212]'>
            Review Your Order (2 items)
          </h2>
          <div className='flex flex-col gap-y-2.5'>
            <h3 className='text-3xl font-medium text-[#121212]'>
              Total Payment
            </h3>
            <h4 className='text-3xl font-medium text-[#121212]'>IDR 250.000</h4>
          </div>
          <div className='flex flex-wrap gap-x-[1.125rem]'>
            <div className='h-[150px] w-[125px] overflow-hidden rounded-xl'>
              <img
                src={ProductOne}
                alt='Product 1'
                className='size-full object-cover'
              />
            </div>
            <h3>Basic T-Shirt</h3>
            <div className='flex flex-col gap-y-3'>
              <h3 className='text-xs font-medium text-black/30'>Quantity</h3>
              <Input type='number' value='1' className='w-[111px]' />
            </div>
            <h3>IDR 150.000</h3>
          </div>
          <div className='flex flex-wrap gap-x-[1.125rem]'>
            <div className='h-[150px] w-[125px] overflow-hidden rounded-xl'>
              <img
                src={ProductOne}
                alt='Product 1'
                className='size-full object-cover'
              />
            </div>
            <h3>Basic T-Shirt</h3>
            <div className='flex flex-col gap-y-3'>
              <h3 className='text-xs font-medium text-black/30'>Quantity</h3>
              <Input type='number' value='1' className='w-[111px]' />
            </div>
            <h3>IDR 150.000</h3>
          </div>
          <div className='flex gap-x-6'>
            <h3 className='text-lg font-normal text-[#121212]'>
              Order ID #Sample-Store-123121
            </h3>
            <img src={IconClipboard} alt='Copy' className='size-7' />
          </div>
          <Separator className='text-[#E0E0E0]' />
          <div id='total-payment'>
            <div className='flex justify-between'>
              <h3 className='text-lg font-normal text-[#121212]'>Subtotal</h3>
              <h3 className='text-lg font-normal text-[#121212]'>
                IDR 250.000
              </h3>
            </div>
            <div className='flex justify-between'>
              <h3 className='text-lg font-normal text-[#121212]'>Admin Fee</h3>
              <h3 className='text-lg font-normal text-[#121212]'>IDR 22.500</h3>
            </div>
            <div className='flex justify-between'>
              <h3 className='text-lg font-normal text-[#121212]'>
                Tax Service 11%
              </h3>
              <h3 className='text-lg font-normal text-[#121212]'>IDR 27.500</h3>
            </div>
            <div className='flex justify-between'>
              <h3 className='text-lg font-normal text-[#121212]'>
                Shipping Free
              </h3>
              <h3 className='text-lg font-normal text-[#121212]'>IDR 0</h3>
            </div>
            <Separator className='mb-7 mt-2.5 text-[#E0E0E0]' />
            <div className='flex justify-between'>
              <h3 className='text-lg font-normal text-[#121212]'>Subtotal</h3>
              <h3 className='text-lg font-normal text-[#121212]'>
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
