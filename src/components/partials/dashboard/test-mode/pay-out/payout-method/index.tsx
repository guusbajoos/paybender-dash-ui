import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { IStepperNextProps } from '@/schemas'
import { payoutMethodSchema } from '@/schemas/pay-out/payout-method.schema'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const PayoutMethod = <T,>(props: IStepperNextProps<T>) => {
  const form = useForm<z.infer<typeof payoutMethodSchema>>({
    resolver: zodResolver(payoutMethodSchema),
    defaultValues: {
      channel_method: '',
      channel: '',
      amount: 300000,
      customerName: 'James Hetfield',
      customerPhone: '08112003003',
    },
    mode: 'onChange',
  })

  const watchField = form.watch()

  const onSubmit = (val: z.infer<typeof payoutMethodSchema>) => {
    const payload = {
      ...val,
      feeAmount: 22500,
      customerEmail: 'james.hetfield@gmail.com',
    }

    if (Object.keys(form.formState.errors).length === 0) {
      props.onNextStep && props.onNextStep(payload as T)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-2xl font-medium text-black'>
            Set Payout Method
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Transaction Amount
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='0'
                        {...field}
                        type='number'
                        disabled
                        className='disabled:bg-gray-200'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='channel_method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Channel Method
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a withdraw channel method' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Bank Transfer'>
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value='e-Wallet'>e-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchField.channel_method && (
                <FormField
                  control={form.control}
                  name='channel'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-normal text-[#777677]'>
                        Channel Name
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className='font-normal text-[#777677]'>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a withdraw channel name' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {watchField.channel_method === 'Bank Transfer' && (
                            <>
                              <SelectItem value='Bank BCA Transfer'>
                                Bank BCA Transfer
                              </SelectItem>
                              <SelectItem value='Bank Mandiri Transfer'>
                                Bank Mandiri Transfer
                              </SelectItem>
                              <SelectItem value='Bank BRI Transfer'>
                                Bank BRI Transfer
                              </SelectItem>
                              <SelectItem value='Bank BNI Transfer'>
                                Bank BNI Transfer
                              </SelectItem>
                              <SelectItem value='Bank BSI Transfer'>
                                Bank BSI Transfer
                              </SelectItem>
                              <SelectItem value='Bank CIMBNiaga Transfer'>
                                Bank CIMBNiaga Transfer
                              </SelectItem>
                              <SelectItem value='Bank Permata Transfer'>
                                Bank Permata Transfer
                              </SelectItem>
                            </>
                          )}
                          {watchField.channel_method === 'e-Wallet' && (
                            <>
                              <SelectItem value='GoPay'>GoPay</SelectItem>
                              <SelectItem value='DANA'>DANA</SelectItem>
                              <SelectItem value='LinkAja'>LinkAja</SelectItem>
                              <SelectItem value='OVO'>OVO</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='customerName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Receiver Account Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='Input Receiver Account Name'
                        onChange={field.onChange}
                        value={field.value}
                        disabled
                        className='disabled:bg-gray-200'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='customerPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Receiver Account Number
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input
                        placeholder='Input Receiver Account Number'
                        onChange={field.onChange}
                        value={field.value}
                        disabled
                        className='disabled:bg-gray-200'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
              type='submit'
              disabled={props.isLoading}
            >
              {props.isLoading ? 'Processing' : 'CONTINUE'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PayoutMethod
