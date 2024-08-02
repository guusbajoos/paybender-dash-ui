import { useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

const OrderStatusEMoney = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className='p-6'>
      <h2 className='text-center text-2xl font-medium text-black'>
        Thanks for Using DANA
      </h2>
      <Separator className='my-4 text-[#C7C7C7]' />
      <p className='text-center text-lg text-[#5A5A5A]'>
        You will be jump to DANA Page
      </p>
      <Progress value={progress} className='my-2.5 w-full bg-[#CFD6DC]' />
      <p className='text-center text-lg font-normal text-[#5A5A5A]'>
        Please wait, redirecting in 5 seconds or click here
      </p>
    </Card>
  )
}

export default OrderStatusEMoney
