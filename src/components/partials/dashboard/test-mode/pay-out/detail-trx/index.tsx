import { cn, currencyFormatter } from '@/lib/utils'
import dayjs from 'dayjs'

/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailTrxPayout = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col gap-y-2'>
      {data?.status === 'completed' && (
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-medium text-[#464646]'>
            Transaction Paid:
          </h4>
          <span className='text-sm font-medium text-[#464646]'>
            {data?.paid_datetime
              ? dayjs(data?.paid_datetime).format(
                  'dddd, MMMM DD, YYYY HH:mm:ss'
                )
              : '-'}
          </span>
        </div>
      )}
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Transaction ID:</h4>
        <span className='text-sm font-medium text-[#464646]'>
          {data?.transaction_id || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>
          Channel Withdraw:
        </h4>
        <span className='text-sm font-medium text-[#464646]'>
          {data?.channel || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>
          Receiver Account Name:
        </h4>
        <span className='text-sm font-medium text-[#464646]'>
          {data?.customer_name || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>
          Receiver Account Number:
        </h4>
        <span className='text-sm font-medium text-[#464646]'>
          {data?.customer_phone || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Currency:</h4>
        <span className='text-sm font-medium text-[#464646]'>
          {data?.currency || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>
          Transaction Amount:
        </h4>
        <span className='text-sm font-medium text-[#4B8400]'>
          {data?.net_amount
            ? currencyFormatter(Number(data?.net_amount), data?.currency)
            : '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Fee Amount:</h4>
        <span className='text-sm font-medium text-[#4B8400]'>
          {data?.fee_amount
            ? currencyFormatter(Number(data?.fee_amount), data?.currency)
            : '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Total Amount:</h4>
        <span className='text-sm font-medium text-[#4B8400]'>
          {data?.gross_amount
            ? currencyFormatter(Number(data?.gross_amount), data?.currency)
            : '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Status:</h4>
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
          {data?.status || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Remarks:</h4>
        <span className='text-sm font-medium text-[#464646]'>
          {data?.remarks || '-'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium text-[#464646]'>Callback Status:</h4>
        <span
          className={cn('rounded-md border p-1 text-sm font-normal', {
            'border-[#4B8400] bg-[#C8F08F] text-[#4B8400]':
              data?.callback_status === 1,
            'border-[#FF0000] bg-[#FFD6D6] text-[#FF0000]':
              data?.callback_status === 0,
          })}
        >
          {data?.callback_status === 1
            ? 'Yes'
            : data?.callback_status === 0
              ? 'No'
              : '-'}
        </span>
      </div>
    </div>
  )
}

export default DetailTrxPayout
