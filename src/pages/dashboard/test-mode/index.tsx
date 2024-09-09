/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconArrowLeft, IconCash, IconEye } from '@tabler/icons-react'
import PaybenderLogo from '@/assets/images/paybender-logo.png'
import IconCheck from '@/assets/images/icon-check.png'
import IconRefresh from '@/assets/images/icon-refresh.png'
import IconTimes from '@/assets/images/icon-times.png'

import dayjs from 'dayjs'

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from '@/components/custom/breadcrumb'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { Button } from '@/components/custom/button'
import { cn, currencyFormatter } from '@/lib/utils'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/partials/dashboard/test-mode/table/data-table'
import { columnsPayin } from '@/data/pay-in/columns'
import { columnsPayout } from '@/data/pay-out/columns'
import { Separator } from '@/components/ui/separator'
import TablePagination from '@/components/custom/table-pagination'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useGetList from '@/hooks/use-get-data'
import DetailTrxPayin from '@/components/partials/dashboard/test-mode/pay-in/detail-trx'
import DetailTrxPayout from '@/components/partials/dashboard/test-mode/pay-out/detail-trx'

export default function TestMode() {
  const navigate = useNavigate()
  const location = useLocation()

  const isChildRoute = location.pathname !== '/app/get-started/test-mode'

  const [tabKey, setTabKey] = useState(location.state?.testMode || 'pay-in')
  const [isOpenDetailTrx, setIsOpenDetailTrx] = useState(false)
  const [params, setParams] = useState<{
    page: number
    limit: number
    total_data: number
    total_page: number
  }>({
    page: 1,
    limit: 10,
    total_data: 0,
    total_page: 0,
  })
  const [dataTrx, setDataTrx] = useState([])
  const [dataSummary, setDataSummary] = useState<{
    balance: string
    countCompleted: number
    countFailed: number
    countProcessing: number
  }>({
    balance: '',
    countCompleted: 0,
    countFailed: 0,
    countProcessing: 0,
  })
  const [trxDetail, setTrxDetail] = useState<any>({})

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Get Started', href: '/app/get-started' },
    { title: 'Test Mode' },
  ].map(({ href, title }) => (
    <BreadcrumbItem key={title}>
      {href ? (
        <Link className='text-sm font-medium text-[#777677]' to={href}>
          {title}
        </Link>
      ) : (
        <span className='text-sm font-medium text-[#3CC1D1]'>{title}</span>
      )}
    </BreadcrumbItem>
  ))

  const { isLoading, handleParamsChange } = useGetList(
    `${import.meta.env.VITE_APP_API_URL}/paybender-demo-get/${tabKey === 'pay-in' ? 'payin' : 'payout'}`,
    {
      initialParams: {
        page: 1,
        limit: 10,
      },
      token: '',
      onSuccess: (data) => {
        setDataTrx(data.data)
        setDataSummary(data.summary)
        setParams(data.meta)
      },
      onError: (err) => console.log({ err }),
    }
  )

  const columns = tabKey === 'pay-in' ? columnsPayin : columnsPayout

  return isChildRoute ? (
    <Outlet />
  ) : (
    <>
      <Link
        to='/app/get-started'
        className='mb-10 flex items-center gap-x-2 text-sm font-medium text-[#3CC1D1]'
      >
        <IconArrowLeft />
        Back
      </Link>
      <Breadcrumb className='mb-2.5'>{breadcrumbs}</Breadcrumb>
      <h2 className='mb-10 text-3xl font-medium text-[#2A8F9B]'>Test Mode</h2>
      <Tabs orientation='vertical' defaultValue='pay-in' className='space-y-4'>
        <div className='w-fit overflow-x-auto pb-2'>
          <TabsList className='flex h-auto gap-x-2.5 bg-[#EEF9FA]'>
            <Button
              className={cn(
                'hover:bg-tranparent w-full min-w-[140px] bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'pay-in',
                }
              )}
              onClick={() => {
                setTabKey('pay-in')
                setParams((prev) => ({ ...prev, page: 1 }))
                handleParamsChange({ page: 1, limit: 10 })
                navigate('/app/get-started/test-mode')
              }}
            >
              Pay In
            </Button>
            <Button
              className={cn(
                'hover:bg-tranparent w-full min-w-[140px] bg-transparent text-[#959595] shadow-none focus:bg-transparent',
                {
                  'bg-[#3CC1D1] text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90':
                    tabKey === 'pay-out',
                }
              )}
              onClick={() => {
                setTabKey('pay-out')
                setParams((prev) => ({ ...prev, page: 1 }))
                handleParamsChange({ page: 1, limit: 10 })
                navigate('/app/get-started/test-mode')
              }}
            >
              Pay Out
            </Button>
          </TabsList>
        </div>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
            <img
              src={PaybenderLogo}
              alt='Paybender Logo'
              className='w-[150px] object-cover'
            />
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-y-4'>
              <h3 className='text-lg font-medium text-[#121212]'>Summary</h3>
              <div className='flex flex-wrap gap-x-[6.125rem] gap-y-6'>
                <div className='flex items-center gap-x-2.5'>
                  <div className='flex items-center justify-center rounded-full bg-black p-0.5'>
                    <IconCash size={24} className='text-white' />
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <span className='text-xs font-medium text-[#AEAEAE]'>
                      Balance
                    </span>
                    <h3 className='text-sm font-medium text-black'>
                      {currencyFormatter(Number(dataSummary?.balance), 'IDR')}
                    </h3>
                  </div>
                </div>
                <div className='flex items-center gap-x-2.5'>
                  <img src={IconCheck} alt='Paid' className='size-6' />
                  <div className='flex flex-col gap-y-1'>
                    <span className='text-xs font-medium text-[#AEAEAE]'>
                      Success
                    </span>
                    <h3 className='text-sm font-medium text-black'>
                      {dataSummary.countCompleted}
                    </h3>
                  </div>
                </div>
                <div className='flex items-center gap-x-2.5'>
                  <img src={IconRefresh} alt='Unpaid' className='size-6' />
                  <div className='flex flex-col gap-y-1'>
                    <span className='text-xs font-medium text-[#AEAEAE]'>
                      Processing
                    </span>
                    <h3 className='text-sm font-medium text-black'>
                      {dataSummary.countProcessing}
                    </h3>
                  </div>
                </div>
                <div className='flex items-center gap-x-2.5'>
                  <img src={IconTimes} alt='Failed' className='size-6' />
                  <div className='flex flex-col gap-y-1'>
                    <span className='text-xs font-medium text-[#AEAEAE]'>
                      Failed
                    </span>
                    <h3 className='text-sm font-medium text-black'>
                      {dataSummary.countFailed}
                    </h3>
                  </div>
                </div>
              </div>
              <Button
                className='bg-[#3CC1D1] text-white shadow-none hover:bg-[#3CC1D1] focus:bg-[#3CC1D1]'
                onClick={() => {
                  if (tabKey === 'pay-in')
                    navigate('/app/get-started/test-mode/pay-in')
                  if (tabKey === 'pay-out')
                    navigate('/app/get-started/test-mode/pay-out')
                }}
              >
                {tabKey === 'pay-in' ? 'TRY PAYMENT' : 'TRY WITHDRAW'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Tabs>
      <div className='mt-[93px]'>
        <h2 className='text-lg font-medium text-black'>Transactions</h2>
        <Separator className='my-6 text-[#C7C7C7]' />
        <DataTable
          isLoading={isLoading}
          columns={[
            {
              accessorKey: 'id',
              header: () => 'No',
              cell: ({ row }) =>
                params.page * params.limit - params.limit + row.index + 1,
            },
            ...columns,
            {
              id: 'actions',
              header: 'Actions',
              cell: ({ row }) => (
                <div className='flex items-center gap-x-2'>
                  <IconEye
                    size={24}
                    className='cursor-pointer text-[#3CC1D1] hover:text-[#3CC1D1] focus:text-[#3CC1D1]'
                    onClick={() => {
                      setIsOpenDetailTrx(true)
                      setTrxDetail(row.original)
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={dataTrx}
        />
        {dataTrx.length > 0 && (
          <div className='mt-4'>
            <TablePagination
              count={params.total_data}
              current_page={params.page}
              onPageChange={(v) =>
                handleParamsChange({
                  page: v,
                  limit: 10,
                })
              }
              page_size={params.limit}
            />
          </div>
        )}
      </div>
      <Dialog
        open={isOpenDetailTrx}
        onOpenChange={(v) => {
          setIsOpenDetailTrx(v)
          setTrxDetail({})
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-6 text-[2rem] text-[#2A8F9B]'>
              Transaction Detail
            </DialogTitle>
            <DialogDescription className='!mt-0'>
              <Card className='border-none shadow-md'>
                <CardHeader>
                  <CardTitle className='flex flex-col gap-y-6 text-center text-2xl text-[#3CC1D1]'>
                    {tabKey === 'pay-in' ? 'Pay In' : 'Pay Out'}
                    <img
                      src={PaybenderLogo}
                      alt='Paybender Logo'
                      className='mx-auto w-[150px] object-cover'
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='mb-6 flex flex-col gap-y-2'>
                    <div className='flex flex-col items-center justify-center gap-x-4'>
                      <h4 className='text-sm font-medium text-[#464646]'>
                        Transaction Created:
                      </h4>
                      <span className='text-sm font-medium text-[#464646]'>
                        {dayjs(trxDetail?.trx_datetime).format(
                          'dddd, MMMM DD, YYYY HH:mm:ss'
                        )}
                      </span>
                    </div>
                  </div>
                  {tabKey === 'pay-in' && <DetailTrxPayin data={trxDetail} />}
                  {tabKey === 'pay-out' && <DetailTrxPayout data={trxDetail} />}
                </CardContent>
              </Card>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
