import { useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

const OrderStatusEMoney = ({ countdown }: { countdown: number }) => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className='p-6'>
      <h2 className='text-center text-lg font-medium text-black lg:text-2xl'>
        Thanks for Using DANA
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='text-center text-sm text-[#5A5A5A] lg:text-lg'>
        You will be jump to DANA Page
      </p>
      <Progress value={progress} className='my-2.5 w-full bg-[#CFD6DC]' />
      <p className='text-center text-sm font-normal text-[#5A5A5A] lg:text-lg'>
        Please wait, redirecting in {countdown} seconds or click here
      </p>
    </Card>
  )
}

export default OrderStatusEMoney
