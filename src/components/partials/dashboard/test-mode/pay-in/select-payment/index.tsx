/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PaymentQRIS from './payment-qris'
import PaymentEMoney from './payment-emoney'
import PaymentVA from './payment-va'

import { cn } from '@/lib/utils'
import { IStepperNextProps } from '@/data/pay-in/contact-information.schema'
import { IPaymentMethodChange } from '@/data/schemas'

export type TSelectPaymentProps = IStepperNextProps<any> &
  IPaymentMethodChange & {
    payment_type: string
    payment_method: string
  }

const SelectPayment = (props: TSelectPaymentProps) => {
  const [tabKey, setTabKey] = useState('qris')

  const handleChoosePayment = (v: string) => {
    props.onNextStep && props.onNextStep({ payment_type: v })
  }

  return (
    <div id='select-payment'>
      <h2 className='text-2xl font-medium text-black'>Select Payment</h2>
      <Separator className='my-4 text-[#C7C7C7]' />

      <Tabs
        orientation='vertical'
        defaultValue='qris'
        className='space-y-4'
        onValueChange={(v) => setTabKey(v)}
      >
        <div className='w-full overflow-x-auto pb-2'>
          <TabsList className='flex h-auto gap-x-2.5 bg-[#EEF9FA]'>
            <Button
              className={cn(
                'hover:bg-tranparent w-full bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'qris',
                }
              )}
              onClick={() => setTabKey('qris')}
            >
              QRIS
            </Button>
            <Button
              className={cn(
                'hover:bg-tranparent w-full bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'wallet',
                }
              )}
              onClick={() => setTabKey('wallet')}
            >
              E-Money
            </Button>
            <Button
              className={cn(
                'hover:bg-tranparent w-full bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'va',
                }
              )}
              onClick={() => setTabKey('va')}
            >
              Virtual Account
            </Button>
          </TabsList>
        </div>
        <Card className='p-6'>
          {tabKey === 'qris' && <PaymentQRIS />}
          {tabKey === 'wallet' && (
            <PaymentEMoney
              onPaymentMethodChange={props.onPaymentMethodChange}
            />
          )}
          {tabKey === 'va' && (
            <PaymentVA onPaymentMethodChange={props.onPaymentMethodChange} />
          )}
          <Button
            className='mt-[1.125rem] w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
            onClick={() => props.onNextStep && props.onNextStep({})}
          >
            CONTINUE TO PAY
          </Button>
        </Card>
      </Tabs>
    </div>
  )
}

export default SelectPayment
