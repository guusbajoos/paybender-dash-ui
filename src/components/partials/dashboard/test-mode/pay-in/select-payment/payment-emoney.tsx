import DANA from '@/assets/images/DANA.png'
import ShopeePay from '@/assets/images/Shopee Pay.png'
import LinkAja from '@/assets/images/LinkAja.png'
import OVO from '@/assets/images/OVO.png'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export type PaymentMethod = 'DANA' | 'ShopeePay' | 'LinkAja' | 'OVO' | undefined

interface IPaymentEMoneyProps {
  onPaymentMethodChange: (method: PaymentMethod) => void
}

const PaymentEMoney = (props: IPaymentEMoneyProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(undefined)

  const handleChangePayment = (method: PaymentMethod) => {
    setPaymentMethod(method)

    props.onPaymentMethodChange && props.onPaymentMethodChange(method)
  }

  return (
    <div className='flex flex-col gap-y-[1.125rem]'>
      <h4 className='text-lg font-normal text-[#5A5A5A]'>
        E-money payment channels offer convenient and secure ways for customers
        to make digital payments using electronic money stored in mobile wallets
        or accounts. Explore the e-money payment channels below to learn more
        about their features and integration options.
      </h4>

      <div className=''>
        <h2 className='text-2xl font-medium text-black'>Select e-Money</h2>
        <Separator className='my-4' />

        <div className='flex flex-wrap items-center justify-between'>
          <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod === 'DANA',
              }
            )}
            onClick={() => handleChangePayment('DANA')}
          >
            <img
              src={DANA}
              alt='DANA'
              className='h-full w-[94px] object-contain'
            />
          </div>
          <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod === 'ShopeePay',
              }
            )}
            onClick={() => handleChangePayment('ShopeePay')}
          >
            <img
              src={ShopeePay}
              alt='ShopeePay'
              className='h-full w-[94px] object-contain'
            />
          </div>
          <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod === 'LinkAja',
              }
            )}
            onClick={() => handleChangePayment('LinkAja')}
          >
            <img
              src={LinkAja}
              alt='LinkAja'
              className='h-full w-[94px] object-contain'
            />
          </div>
          <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod === 'OVO',
              }
            )}
            onClick={() => handleChangePayment('OVO')}
          >
            <img
              src={OVO}
              alt='OVO'
              className='h-full w-[94px] object-contain'
            />
          </div>
        </div>
      </div>

      <Card className='border-none bg-[#EEF9FA] p-2.5 shadow-none'>
        <p className='text-lg font-normal text-[#5A5A5A]'>
          DANA is an e-wallet that offers a range of financial services,
          including payments, transfers, and bill payments. It aims to provide
          financial inclusion to all Indonesians.
        </p>
      </Card>
    </div>
  )
}

export default PaymentEMoney
