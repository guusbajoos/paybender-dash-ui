import {
  IconArrowLeft,
  IconCash,
  IconCircleCheck,
  IconEye,
} from '@tabler/icons-react'
import PaybenderLogo from '@/assets/images/paybender-logo.png'
import IconCheck from '@/assets/images/icon-check.png'
import IconRefresh from '@/assets/images/icon-refresh.png'
import IconTimes from '@/assets/images/icon-times.png'

import dayjs from 'dayjs'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from '@/components/custom/breadcrumb'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/partials/dashboard/test-mode/table/data-table'
import { columnsPayin } from '@/data/pay-in/columns'
import { columnsPayout } from '@/data/pay-out/columns'
import { transactionPayin } from '@/data/pay-in/transactions'
import { transactionPayout } from '@/data/pay-out/transactions'
import { Separator } from '@/components/ui/separator'
import TablePagination from '@/components/custom/table-pagination'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function TestMode() {
  const navigate = useNavigate()
  const location = useLocation()
  const [tabKey, setTabKey] = useState(location.state?.testMode || 'pay-in')
  const [isOpenDetailTrx, setIsOpenDetailTrx] = useState(false)

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Get Started', href: '/get-started' },
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

  const columns = tabKey === 'pay-in' ? columnsPayin : columnsPayout
  const dataTrx = tabKey === 'pay-in' ? transactionPayin : transactionPayout

  return (
    <Layout className='bg-[#FAFAFB]'>
      {/* ===== Top Heading ===== */}
      <Layout.Header className='shadow-sm'>
        <Timestamp
          date={dayjs().format('dddd, MMMM DD, YYYY')}
          time={dayjs().format('HH:mm A')}
        />
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        {location.state?.testMode === 'pay-out' ? (
          <Alert variant='success' className='mb-10'>
            <IconCircleCheck className='h-4 w-4' />
            <AlertTitle className='text-[#263238]'>
              Withdrawal Success
            </AlertTitle>
            <AlertDescription className='text-[#546E7A]'>
              Funds successfully withdrawn to receiver account.
            </AlertDescription>
          </Alert>
        ) : (
          <Link
            to='/get-started'
            className='mb-10 flex items-center gap-x-2 text-sm font-medium text-[#3CC1D1]'
          >
            <IconArrowLeft />
            Back
          </Link>
        )}
        <Breadcrumb className='mb-2.5'>{breadcrumbs}</Breadcrumb>
        <h2 className='mb-10 text-3xl font-medium text-[#2A8F9B]'>Test Mode</h2>
        <Tabs
          orientation='vertical'
          defaultValue='pay-in'
          className='space-y-4'
          onValueChange={(v) => setTabKey(v)}
        >
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
                onClick={() => setTabKey('pay-in')}
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
                onClick={() => setTabKey('pay-out')}
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
                        IDR 6.974.000,00
                      </h3>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2.5'>
                    <img src={IconCheck} alt='Paid' className='size-6' />
                    <div className='flex flex-col gap-y-1'>
                      <span className='text-xs font-medium text-[#AEAEAE]'>
                        Success
                      </span>
                      <h3 className='text-sm font-medium text-black'>3</h3>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2.5'>
                    <img src={IconRefresh} alt='Unpaid' className='size-6' />
                    <div className='flex flex-col gap-y-1'>
                      <span className='text-xs font-medium text-[#AEAEAE]'>
                        Processing
                      </span>
                      <h3 className='text-sm font-medium text-black'>1</h3>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2.5'>
                    <img src={IconTimes} alt='Failed' className='size-6' />
                    <div className='flex flex-col gap-y-1'>
                      <span className='text-xs font-medium text-[#AEAEAE]'>
                        Failed
                      </span>
                      <h3 className='text-sm font-medium text-black'>1</h3>
                    </div>
                  </div>
                </div>
                <Button
                  className='bg-[#3CC1D1] text-white shadow-none hover:bg-[#3CC1D1] focus:bg-[#3CC1D1]'
                  onClick={() => {
                    if (tabKey === 'pay-in')
                      navigate('/get-started/test-mode/pay-in')
                    if (tabKey === 'pay-out')
                      navigate('/get-started/test-mode/pay-out')
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
            columns={[
              ...columns,
              {
                id: 'actions',
                header: 'Actions',
                cell: () => (
                  <div className='flex items-center gap-x-2'>
                    <IconEye
                      size={24}
                      className='cursor-pointer text-[#3CC1D1] hover:text-[#3CC1D1] focus:text-[#3CC1D1]'
                      onClick={() => setIsOpenDetailTrx(true)}
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
                count={dataTrx.length}
                current_page={1}
                onPageChange={() => {}}
                page_size={10}
              />
            </div>
          )}
        </div>
        <Dialog open={isOpenDetailTrx} onOpenChange={setIsOpenDetailTrx}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='mb-6 text-[2rem] text-[#2A8F9B]'>
                Transaction Detail
              </DialogTitle>
              <DialogDescription className='!mt-0'>
                <Card className='border-none shadow-md'>
                  <CardHeader>
                    <div className='flex flex-col gap-y-6'>
                      <CardTitle className='text-center text-2xl text-[#3CC1D1]'>
                        {tabKey === 'pay-in' ? 'Pay In' : 'Pay Out'}
                      </CardTitle>
                      <img
                        src={PaybenderLogo}
                        alt='Paybender Logo'
                        className='mx-auto w-[150px] object-cover'
                      />
                      <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center justify-center gap-x-4'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Transaction Created:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            1 August 2024, 22:47:00
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Payout ID:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            030624414531D0005
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Payin Channel:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            Bank BCA Transfer
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Email Address:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            michael.jackson@gmail.com
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            User Name:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            Michael Jackson
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Bank Account No:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            1112223333
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Currency:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            IDR
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Amount:
                          </h4>
                          <span className='text-lg font-medium text-[#4B8400]'>
                            5.015.000
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Fee:
                          </h4>
                          <span className='text-lg font-medium text-[#4B8400]'>
                            15.000
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Money Receive:
                          </h4>
                          <span className='text-lg font-medium text-[#4B8400]'>
                            5.000.000
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Status:
                          </h4>
                          <span className='rounded-md border border-[#4B8400] bg-[#C8F08F] p-1 text-sm font-normal text-[#4B8400]'>
                            Success, received by customer
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Reason:
                          </h4>
                          <span className='text-lg font-medium text-[#464646]'>
                            -
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-lg font-medium text-[#464646]'>
                            Callback Status:
                          </h4>
                          <span className='rounded-md border border-[#4B8400] bg-[#C8F08F] p-1 text-sm font-normal text-[#4B8400]'>
                            Success
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Layout.Body>
    </Layout>
  )
}
