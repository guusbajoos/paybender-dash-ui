import BCA from '@/assets/images/BCA.png'
import MANDIRI from '@/assets/images/MANDIRI.png'
import BRI from '@/assets/images/BRI.png'
import BNI from '@/assets/images/BNI.png'
import BSI from '@/assets/images/BSI.png'
import CIMBNiaga from '@/assets/images/CIMB Niaga.png'
import Permata from '@/assets/images/Permata.png'

import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
// import { IconChevronRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import {
  IPaymentMethodChange,
  TPaymentMethod,
  TPaymentType,
} from '@/data/schemas'

const PaymentVA = (props: IPaymentMethodChange) => {
  const [paymentMethod, setPaymentMethod] = useState<{
    payment_type: TPaymentType | undefined
    payment_method: TPaymentMethod | undefined
  }>({ payment_type: undefined, payment_method: undefined })

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
        A Virtual Account is a digital payment method through an account that is
        created virtually for each customer. To make payments, customers will be
        referred to their own Virtual Accounts. A Virtual Account consists of a
        unique customer ID number. It means that there will be no Virtual Account
        number that is exactly the same. So, each transaction can be identified
        automatically for different customers. When the transaction is complete,
        they do not need to send a transfer receipt anymore.
      </h4>  */}

      <div className=''>
        <h2 className='text-2xl font-medium text-black'>
          Select Virtual Account
        </h2>
        <Separator className='my-4' />

        <div className='flex flex-col gap-y-[1.125rem]'>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'BCA',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={BCA}
                alt='BCA'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]': paymentMethod.payment_method === 'BCA',
                  }
                )}
              >
                BCA Virtual Account
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'MANDIRI',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={MANDIRI}
                alt='MANDIRI'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]':
                      paymentMethod.payment_method === 'MANDIRI',
                  }
                )}
              >
                Mandiri Virtual Account
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'BRI',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={BRI}
                alt='BRI'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]': paymentMethod.payment_method === 'BRI',
                  }
                )}
              >
                BRIVA
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'BNI',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={BNI}
                alt='BNI'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]': paymentMethod.payment_method === 'BNI',
                  }
                )}
              >
                BNI Virtual Account
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'BSI',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={BSI}
                alt='BSI'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]': paymentMethod.payment_method === 'BSI',
                  }
                )}
              >
                BSI Virtual Account
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'CIMBNiaga',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={CIMBNiaga}
                alt='CIMBNiaga'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]':
                      paymentMethod.payment_method === 'CIMBNiaga',
                  }
                )}
              >
                CIMB Virtual Account
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
          <div
            className='flex cursor-pointer items-center justify-between px-2 py-[1.125rem]'
            onClick={() =>
              handleChangePayment({
                payment_type: 'VA',
                payment_method: 'Permata',
              })
            }
          >
            <div className='flex items-center gap-x-4'>
              <img
                src={Permata}
                alt='Permata'
                className='h-auto w-[94px] object-contain'
              />
              <span
                className={cn(
                  'cursor-pointer text-2xl font-medium text-[#959595]',
                  {
                    'text-[#70CEDA]':
                      paymentMethod.payment_method === 'Permata',
                  }
                )}
              >
                Permata Virtual Account
              </span>
            </div>
            {/* <IconChevronRight className='text-[#959595]' /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentVA
