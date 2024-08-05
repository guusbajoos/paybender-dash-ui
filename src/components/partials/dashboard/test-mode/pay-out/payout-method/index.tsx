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
import { IStepperNextProps } from '@/data/pay-in/contact-information.schema'
import { payoutMethodSchema } from '@/data/pay-out/payout-method.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const PayoutMethod = <T,>(props: IStepperNextProps<T>) => {
  const form = useForm<z.infer<typeof payoutMethodSchema>>({
    resolver: zodResolver(payoutMethodSchema),
    defaultValues: {
      channel: '',
      amount: 0,
      customerName: 'James Hetfield',
      customerPhone: '08112003003',
    },
    mode: 'onChange',
  })

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
                      <Input placeholder='0' {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='channel'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Channel Method
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a withdraw method channel' />
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
