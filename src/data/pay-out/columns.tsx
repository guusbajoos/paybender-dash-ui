/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { IconArrowsUpDown } from '@tabler/icons-react'
import dayjs from 'dayjs'

export const columnsPayout: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'trx_date',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Transaction Date
          <IconArrowsUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) =>
      row.getValue('trx_date')
        ? dayjs(row.getValue('trx_date')).format('MMM DD, YYYY, HH:mm:ss')
        : '-',
  },
  {
    accessorKey: 'trx_id',
    header: () => 'Transaction ID',
    cell: ({ row }) => row.getValue('trx_id') || '-',
  },
  {
    accessorKey: 'merchant_refno',
    header: () => 'Merchant Ref No',
    cell: ({ row }) => row.getValue('merchant_refno') || '-',
  },
  {
    accessorKey: 'currency',
    header: () => 'Currency',
    cell: ({ row }) => row.getValue('currency') || '-',
  },
  {
    accessorKey: 'method',
    header: () => 'Channel Withdraw',
    cell: ({ row }) => row.getValue('method') || '-',
  },
  {
    accessorKey: 'customer_acct_no',
    header: () => 'Receiver Acct No',
    cell: ({ row }) => row.getValue('customer_acct_no') || '-',
  },
  {
    accessorKey: 'customer_acct_name',
    header: () => 'Receiver Acct Name',
    cell: ({ row }) => row.getValue('customer_acct_name') || '-',
  },
  {
    accessorKey: 'gross_amount',
    header: () => 'Transaction Amount',
    cell: ({ row }) => row.getValue('gross_amount') || '-',
  },
  {
    accessorKey: 'fees',
    header: () => 'Fee Amount',
    cell: ({ row }) => row.getValue('fees') || '-',
  },
  {
    accessorKey: 'net_amount',
    header: () => 'Net Amount',
    cell: ({ row }) => row.getValue('net_amount') || '-',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('status') === 'success' && (
            <span className='rounded-sm bg-[#00B69B]/30 px-2.5 py-1.5 text-xs font-medium text-[#00B69B]'>
              Completed
            </span>
          )}
          {row.getValue('status') === 'processing' && (
            <span className='rounded-sm bg-[#EFC100]/30 px-2.5 py-1.5 text-xs font-medium text-[#EFC100]'>
              Processing
            </span>
          )}
          {row.getValue('status') === 'failed' && (
            <span className='rounded-sm bg-[#DB8479]/30 px-2.5 py-1.5 text-xs font-medium text-[#DB2A14]'>
              Failed
            </span>
          )}
        </>
      )
    },
  },
]
