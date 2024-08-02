/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { IconArrowsUpDown } from '@tabler/icons-react'
import dayjs from 'dayjs'

export const columns: ColumnDef<any>[] = [
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
        ? dayjs(row.getValue('trx_date')).format('MMM DD, YYYY, HH:mm A')
        : '-',
  },
  {
    accessorKey: 'trx_id',
    header: () => 'Transaction ID',
    cell: ({ row }) => row.getValue('trx_id') || '-',
  },
  {
    accessorKey: 'trx_rc',
    header: () => 'RC',
    cell: ({ row }) => row.getValue('trx_rc') || '-',
  },
  {
    accessorKey: 'description',
    header: () => 'Description',
    cell: ({ row }) => row.getValue('description') || '-',
  },
  {
    accessorKey: 'currency',
    header: () => 'Currency',
    cell: ({ row }) => row.getValue('currency') || '-',
  },
  {
    accessorKey: 'gross_amount',
    header: () => 'Gross Amount',
    cell: ({ row }) => row.getValue('gross_amount') || '-',
  },
  {
    accessorKey: 'fees',
    header: () => 'Fees',
    cell: ({ row }) => row.getValue('fees') || '-',
  },
  {
    accessorKey: 'net_amount',
    header: () => 'Net',
    cell: ({ row }) => row.getValue('net_amount') || '-',
  },
  {
    accessorKey: 'last_balance',
    header: () => 'Ending Balance',
    cell: ({ row }) => row.getValue('last_balance') || '-',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('status') === 'completed' && (
            <span className='rounded-sm bg-[#00B69B]/30 px-2.5 py-1.5 text-xs font-medium text-[#00B69B]'>
              Completed
            </span>
          )}
          {row.getValue('status') === 'processing' && (
            <span className='rounded-sm bg-[#EFC100]/30 px-2.5 py-1.5 text-xs font-medium text-[#EFC100]'>
              Processing
            </span>
          )}
        </>
      )
    },
  },
]
