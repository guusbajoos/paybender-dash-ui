import DANA from '@/assets/images/DANA.png'
// import ShopeePay from '@/assets/images/Shopee Pay.png'
import LinkAja from '@/assets/images/LinkAja.png'
import OVO from '@/assets/images/OVO.png'

// import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  IPaymentMethodChange,
  TPaymentMethod,
  TPaymentType,
} from '@/data/schemas'
import { cn } from '@/lib/utils'
import useCheckout from '@/store/use-checkout'
import { useState } from 'react'

const PaymentEMoney = (props: IPaymentMethodChange) => {
  const payment = useCheckout((state) => state.data.payment)

  const [paymentMethod, setPaymentMethod] = useState<{
    payment_type: TPaymentType | undefined
    payment_method: TPaymentMethod | undefined
  }>({
    payment_type: undefined,
    payment_method: payment.payment_method || undefined,
  })

  const handleChangePayment = ({
    payment_type,
    payment_method,
  }: {
    payment_type: TPaymentType
    payment_method: TPaymentMethod
  }) => {
    setPaymentMethod({ payment_type, payment_method })

    props.onPaymentMethodChange &&
      props.onPaymentMethodChange({ payment_type, payment_method })
  }

  return (
    <div className='flex flex-col gap-y-[1.125rem]'>
      {/* <h4 className='text-lg font-normal text-[#5A5A5A]'>
        E-money payment channels offer convenient and secure ways for customers
        to make digital payments using electronic money stored in mobile wallets
        or accounts. Explore the e-money payment channels below to learn more
        about their features and integration options.
      </h4>  */}

      <div className=''>
        <h2 className='text-2xl font-medium text-black'>Select e-Money</h2>
        <Separator className='my-4' />

        <div className='flex flex-wrap items-center justify-evenly'>
          <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod.payment_method === 'DANA',
              }
            )}
            onClick={() =>
              handleChangePayment({
                payment_type: 'E-Money',
                payment_method: 'DANA',
              })
            }
          >
            <img
              src={DANA}
              alt='DANA'
              className='h-full w-[94px] object-contain'
            />
          </div>
          {/* <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod.payment_method === 'ShopeePay',
              }
            )}
            onClick={() => handleChangePayment('ShopeePay')}
          >
            <img
              src={ShopeePay}
              alt='ShopeePay'
              className='h-full w-[94px] object-contain'
            />
          </div> */}
          <div
            className={cn(
              'size-[128px] rounded-lg border-2 border-black/10 p-4',
              {
                'border-[#70CEDA]': paymentMethod.payment_method === 'LinkAja',
              }
            )}
            onClick={() =>
              handleChangePayment({
                payment_type: 'E-Money',
                payment_method: 'LinkAja',
              })
            }
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
                'border-[#70CEDA]': paymentMethod.payment_method === 'OVO',
              }
            )}
            onClick={() =>
              handleChangePayment({
                payment_type: 'E-Money',
                payment_method: 'OVO',
              })
            }
          >
            <img
              src={OVO}
              alt='OVO'
              className='h-full w-[94px] object-contain'
            />
          </div>
        </div>
      </div>

      {/* <Card className='border-none bg-[#EEF9FA] p-2.5 shadow-none'>
        <p className='text-lg font-normal text-[#5A5A5A]'>
          DANA is an e-wallet that offers a range of financial services,
          including payments, transfers, and bill payments. It aims to provide
          financial inclusion to all Indonesians.
        </p>
      </Card> */}
    </div>
  )
}

export default PaymentEMoney
