import { Card } from '@/components/ui/card'

const WithdrawInformation = () => {
  return (
    <Card className='p-6'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-normal text-[#121212]'>Transaction Amount</h3>
          <span className='text-lg font-normal text-[#121212]'>IDR 300.000</span>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-normal text-[#121212]'>Fee Amount</h3>
          <span className='text-lg font-normal text-[#121212]'>IDR 2.500</span>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-normal text-[#121212]'>Total Amount</h3>
          <span className='text-lg font-bold text-[#121212]'>IDR 302.500</span>
        </div>
      </div>
    </Card>
  )
}

export default WithdrawInformation
