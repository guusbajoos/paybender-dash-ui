import { IconArrowLeft, IconCash, IconCircleCheck } from '@tabler/icons-react'
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
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DataTable } from '@/components/partials/dashboard/test-mode/table/data-table'
import { columnsPayin } from '@/data/pay-in/columns'
import { columnsPayout } from '@/data/pay-out/columns'
import { transactionPayin } from '@/data/pay-in/transactions'
import { transactionPayout } from '@/data/pay-out/transactions'
import { Separator } from '@/components/ui/separator'
import TablePagination from '@/components/custom/table-pagination'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function TestMode() {
  const navigate = useNavigate()
  const location = useLocation()
  const [tabKey, setTabKey] = useState(location.state?.testMode || 'pay-in')

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
        <div className='flex items-center ml-auto space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        {location.state?.testMode === 'pay-out' ? (
          <Alert variant='success' className='mb-10'>
            <IconCircleCheck className='w-4 h-4' />
            <AlertTitle className='text-[#263238]'>
              Withdrawal Success
            </AlertTitle>
            <AlertDescription className='text-[#546E7A]'>
              Funds successfully withdrawn to your Bank BCA 71298928902471.
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
          <div className='pb-2 overflow-x-auto w-fit'>
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
              {tabKey === 'pay-in' && (
                <Button
                  className='bg-[#3CC1D1] text-white shadow-none hover:bg-[#3CC1D1] focus:bg-[#3CC1D1]'
                  onClick={() => navigate('/get-started/test-mode/pay-in')}
                >
                  TRY PAY IN
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {tabKey === 'pay-in' && (
                <div className='flex flex-col gap-y-4'>
                  <h3 className='text-lg font-medium text-[#121212]'>
                    Summary
                  </h3>
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
                          Paid
                        </span>
                        <h3 className='text-sm font-medium text-black'>23</h3>
                      </div>
                    </div>
                    <div className='flex items-center gap-x-2.5'>
                      <img src={IconRefresh} alt='Unpaid' className='size-6' />
                      <div className='flex flex-col gap-y-1'>
                        <span className='text-xs font-medium text-[#AEAEAE]'>
                          Unpaid
                        </span>
                        <h3 className='text-sm font-medium text-black'>0</h3>
                      </div>
                    </div>
                    <div className='flex items-center gap-x-2.5'>
                      <img src={IconTimes} alt='Failed' className='size-6' />
                      <div className='flex flex-col gap-y-1'>
                        <span className='text-xs font-medium text-[#AEAEAE]'>
                          Failed
                        </span>
                        <h3 className='text-sm font-medium text-black'>7</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tabKey === 'pay-out' && (
                <div className='flex flex-wrap items-center justify-between gap-y-6'>
                  <h3 className='text-lg font-medium text-[#121212]'>
                    Summary
                  </h3>
                  <h4 className='text-lg font-medium text-[#121212]'>
                    IDR2.000.000
                  </h4>
                  <Button
                    className='bg-[#3CC1D1] text-white shadow-none hover:bg-[#3CC1D1] focus:bg-[#3CC1D1]'
                    onClick={() => navigate('/get-started/test-mode/pay-out')}
                  >
                    WITHDRAW
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </Tabs>
        <div className='mt-[93px]'>
          <h2 className='text-lg font-medium text-black'>Transactions</h2>
          <Separator className='my-6 text-[#C7C7C7]' />
          <DataTable columns={columns} data={dataTrx} />
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
      </Layout.Body>
    </Layout>
  )
}
