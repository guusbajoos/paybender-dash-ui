/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
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
          className='px-0'
        >
          Transaction Date
          <CaretSortIcon className='ml-2 h-4 w-4' />
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
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          Transaction ID
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => row.getValue('trx_id') || '-',
  },
  {
    accessorKey: 'merchant_refno',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          Merchant Ref No
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => row.getValue('merchant_refno') || '-',
  },
  {
    accessorKey: 'method',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          Channel Withdraw
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => row.getValue('method') || '-',
  },
  {
    accessorKey: 'currency',
    header: () => 'Currency',
    cell: ({ row }) => row.getValue('currency') || '-',
  },
  {
    accessorKey: 'customer_acct_no',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          Receiver Acct No
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => row.getValue('customer_acct_no') || '-',
  },
  {
    accessorKey: 'customer_acct_name',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0'
        >
          Receiver Acct Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
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
    header: () => 'Total Amount',
    cell: ({ row }) => row.getValue('net_amount') || '-',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('status') === 'success' && (
            <div className='rounded-sm bg-[#00B69B]/30 px-2.5 py-1.5 text-center text-xs font-medium text-[#00B69B]'>
              Completed
            </div>
          )}
          {row.getValue('status') === 'processing' && (
            <div className='rounded-sm bg-[#EFC100]/30 px-2.5 py-1.5 text-center text-xs font-medium text-[#EFC100]'>
              Processing
            </div>
          )}
          {row.getValue('status') === 'failed' && (
            <div className='rounded-sm bg-[#DB8479]/30 px-2.5 py-1.5 text-center text-xs font-medium text-[#DB2A14]'>
              Failed
            </div>
          )}
        </>
      )
    },
  },
]
