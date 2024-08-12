/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { currencyFormatter } from '@/lib/utils'

export const columnsPayout: ColumnDef<any>[] = [
  {
    accessorKey: 'trx_datetime',
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
      row.getValue('trx_datetime')
        ? dayjs(row.getValue('trx_datetime')).format('MMM DD, YYYY, HH:mm:ss')
        : '-',
  },
  {
    accessorKey: 'transaction_id',
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
    cell: ({ row }) => row.getValue('transaction_id') || '-',
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
    accessorKey: 'channel',
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
    cell: ({ row }) => row.getValue('channel') || '-',
  },
  {
    accessorKey: 'currency',
    header: () => 'Currency',
    cell: ({ row }) => row.getValue('currency') || '-',
  },
  {
    accessorKey: 'customer_phone',
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
    cell: ({ row }) => row.getValue('customer_phone') || '-',
  },
  {
    accessorKey: 'customer_name',
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
    cell: ({ row }) => row.getValue('customer_name') || '-',
  },
  {
    accessorKey: 'gross_amount',
    header: () => 'Transaction Amount',
    cell: ({ row }) =>
      row.getValue('gross_amount')
        ? currencyFormatter(
            row.getValue('gross_amount'),
            row.getValue('currency')
          )
        : '-',
  },
  {
    accessorKey: 'fee_amount',
    header: () => 'Fee Amount',
    cell: ({ row }) =>
      row.getValue('fee_amount')
        ? currencyFormatter(
            row.getValue('fee_amount'),
            row.getValue('currency')
          )
        : '-',
  },
  {
    accessorKey: 'net_amount',
    header: () => 'Total Amount',
    cell: ({ row }) =>
      row.getValue('net_amount')
        ? currencyFormatter(
            row.getValue('net_amount'),
            row.getValue('currency')
          )
        : '-',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('status') === 'completed' && (
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
