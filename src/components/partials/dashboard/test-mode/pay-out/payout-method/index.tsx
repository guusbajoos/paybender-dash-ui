import { IconX } from '@tabler/icons-react'

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
import { payoutMethodSchema } from '@/data/pay-out/payout-method.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface IPayoutMethodProps {
  onDirect?: () => void
}

const PayoutMethod = (props: IPayoutMethodProps) => {
  const form = useForm<z.infer<typeof payoutMethodSchema>>({
    resolver: zodResolver(payoutMethodSchema),
    defaultValues: {
      amount: 0,
      withdraw_method: '',
      bank_name: '',
      acc_holder_name: '',
      branch_name: '',
      account_number: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (val: z.infer<typeof payoutMethodSchema>) => {
    console.log(val)
    props.onDirect && props.onDirect()
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-2xl font-medium text-black'>
            Set Payout Method
          </CardTitle>
          <IconX className='size-7' />
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
                      Amount
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
                name='withdraw_method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Withdraw Method Channel
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a withdraw method channel' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='WMC 1'>WMC 1</SelectItem>
                        <SelectItem value='WMC 2'>WMC 2</SelectItem>
                        <SelectItem value='WMC 3'>WMC 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='bank_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Bank Name
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a bank' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Bank 1'>Bank 1</SelectItem>
                        <SelectItem value='Bank 2'>Bank 2</SelectItem>
                        <SelectItem value='Bank 3'>Bank 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='acc_holder_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      A/C Holder Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='xxx' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='branch_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Branch Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='xxx' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='account_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Account Number
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='xxx' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'>
              CONTINUE
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
{
  /* <Button
  className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
  onClick={() => props.onNextStep && props.onNextStep()}
>
  CONTINUE
</Button> */
}

export default PayoutMethod
