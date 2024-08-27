/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { IStepperNextProps } from '@/schemas'
import { IPaymentMethodChange } from '@/schemas'
import useCheckout from '@/store/use-checkout'

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import PaymentQRIS from './payment-qris'
import PaymentEMoney from './payment-emoney'
import PaymentVA from './payment-va'

export type TSelectPaymentProps = IStepperNextProps<any> &
  IPaymentMethodChange & {
    payment_method: string
  }

const SelectPayment = (props: TSelectPaymentProps) => {
  const payment = useCheckout((state) => state.data.payment)

  const [tabKey, setTabKey] = useState(payment?.payment_type || 'QRIS')

  return (
    <div id='select-payment'>
      <h2 className='text-2xl font-medium text-black'>Select Payment</h2>
      <Separator className='my-4 text-[#C7C7C7]' />

      <Tabs
        orientation='vertical'
        defaultValue='QRIS'
        className='space-y-4'
        onValueChange={(v) => setTabKey(v)}
      >
        <div className='w-full pb-2 overflow-x-auto'>
          <TabsList className='flex h-auto gap-x-2.5 bg-[#EEF9FA]'>
            <Button
              className={cn(
                'hover:bg-tranparent w-full bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'QRIS',
                }
              )}
              onClick={() => setTabKey('QRIS')}
            >
              QRIS
            </Button>
            <Button
              className={cn(
                'hover:bg-tranparent w-full bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'E-Money',
                }
              )}
              onClick={() => setTabKey('E-Money')}
            >
              E-Money
            </Button>
            <Button
              className={cn(
                'hover:bg-tranparent w-full bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'VA',
                }
              )}
              onClick={() => setTabKey('VA')}
            >
              Virtual Account
            </Button>
          </TabsList>
        </div>
        <Card className='p-6'>
          {tabKey === 'QRIS' && <PaymentQRIS />}
          {tabKey === 'E-Money' && (
            <PaymentEMoney
              onPaymentMethodChange={(v) => {
                props.onPaymentMethodChange && props.onPaymentMethodChange(v)
              }}
            />
          )}
          {tabKey === 'VA' && (
            <PaymentVA
              onPaymentMethodChange={(v) => {
                props.onPaymentMethodChange && props.onPaymentMethodChange(v)
              }}
            />
          )}
          <Button
            className='mt-[1.125rem] w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
            onClick={() => {
              if (tabKey === 'QRIS') {
                props.onPaymentMethodChange &&
                  props.onPaymentMethodChange({
                    payment_type: 'QRIS',
                    payment_method: 'QRIS',
                  })
              }

              props.onNextStep &&
                props.onNextStep({
                  payment_type: tabKey,
                  payment_method:
                    tabKey === 'QRIS' ? 'QRIS' : props.payment_method,
                })
            }}
            disabled={props.isLoading}
          >
            {props.isLoading ? 'Submitting' : 'CONTINUE TO PAY'}
          </Button>
        </Card>
      </Tabs>
    </div>
  )
}

export default SelectPayment
