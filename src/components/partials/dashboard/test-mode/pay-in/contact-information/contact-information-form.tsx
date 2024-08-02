import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import {
  contactInformationSchema,
  IStepperNextProps,
} from '@/data/pay-in/contact-information.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const ContactInformationForm = (props: IStepperNextProps) => {
  const form = useForm<z.infer<typeof contactInformationSchema>>({
    resolver: zodResolver(contactInformationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      shipping_name: '',
      shipping_country: '',
      shipping_email: '',
      shipping_phone: '',
      shipping_method: '',
      shipping_service: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (val: z.infer<typeof contactInformationSchema>) => {
    console.log(val)
  }

  return (
    <Card className='p-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div id='contact-information'>
            <div className='flex flex-col gap-y-3'>
              <h3>Contact Information</h3>
              <Separator className='mb-4' />
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      First Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='John' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Last Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Email
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='johndoe@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Phone Number
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='08xxxxxxxxxx' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div id='shipping-address'>
            <div className='flex flex-col gap-y-3'>
              <h3>Shipping Address</h3>
              <Separator className='mb-4' />
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='shipping_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      First Name
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='John' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='shipping_country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Country
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Indonesia'>Indonesia</SelectItem>
                        <SelectItem value='Australia'>Australia</SelectItem>
                        <SelectItem value='Japan'>Japan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Email
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='johndoe@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Phone Number
                    </FormLabel>
                    <FormControl className='font-normal text-[#777677]'>
                      <Input placeholder='08xxxxxxxxxx' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div id='shipping-method'>
            <div className='flex flex-col gap-y-3'>
              <h3>Shipping Method</h3>
              <Separator className='mb-4' />
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='shipping_method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Delivery Method
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a delivery method' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Method 1'>Method 1</SelectItem>
                        <SelectItem value='Method 2'>Method 2</SelectItem>
                        <SelectItem value='Method 3'>Method 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='shipping_service'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-[#777677]'>
                      Service
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='font-normal text-[#777677]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a service' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Service 1'>Service 1</SelectItem>
                        <SelectItem value='Service 2'>Service 2</SelectItem>
                        <SelectItem value='Service 3'>Service 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
            onClick={() => props.onNextStep && props.onNextStep()}
          >
            CONTINUE
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default ContactInformationForm
