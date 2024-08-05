import { cn, currencyFormatter } from '@/lib/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailTrxPayin = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col gap-y-2'>
      {data?.status === 'completed' && (
        <div className='flex items-center justify-between'>
          <h4 className='text-lg font-medium text-[#464646]'>
            Transaction Paid:
          </h4>
          <span className='text-lg font-medium text-[#464646]'>Paid</span>
        </div>
      )}
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Transaction ID:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.transaction_id || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Payment Method:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.channel || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>User Name:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.customer_name || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Email Address:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.customer_email || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Phone Number:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.customer_phone || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Currency:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.currency || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>
          Transaction Amount:
        </h4>
        <span className='text-lg font-medium text-[#4B8400]'>
          {data?.trx_amount
            ? currencyFormatter(Number(data?.trx_amount), data?.currency)
            : 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Charged Amount:</h4>
        <span className='text-lg font-medium text-[#4B8400]'>
          {data?.fee_amount
            ? currencyFormatter(Number(data?.fee_amount), data?.currency)
            : 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>
          Settlement Amount:
        </h4>
        <span className='text-lg font-medium text-[#4B8400]'>
          {data?.settlement_amount
            ? currencyFormatter(Number(data?.settlement_amount), data?.currency)
            : 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Status:</h4>
        <span
          className={cn('rounded-md border p-1 text-sm font-normal', {
            'border-[#FFC107] bg-[#FFF3CD] text-[#FFC107]':
              data?.status === 'processing',
            'border-[#4B8400] bg-[#C8F08F] text-[#4B8400]':
              data?.status === 'completed',
            'border-[#FF0000] bg-[#FFD6D6] text-[#FF0000]':
              data?.status === 'failed',
          })}
        >
          {data?.status || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Remarks:</h4>
        <span className='text-lg font-medium text-[#464646]'>
          {data?.remarks || 'N/A'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-medium text-[#464646]'>Callback Status:</h4>
        <span className='p-1 text-sm font-normal'>
          {data?.callback_status === 1
            ? 'Yes'
            : data?.callback_status === 0
              ? 'No'
              : 'N/A'}
        </span>
      </div>
    </div>
  )
}

export default DetailTrxPayin
