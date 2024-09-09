import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import DashboardImageElipse from '@/assets/images/dashboard-elipse.png'
import IconSync from '@/assets/images/icon-sync.png'
// import IconAdsClick from '@/assets/images/icon-ads-click.png'

import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import Timestamp from '@/components/timestamp'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/custom/button'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <Layout className='bg-[#EEF9FA]'>
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
        <div className='mb-10' id='welcome-card'>
          <div className='mb-7 flex flex-col gap-y-2.5'>
            <h1 className='text-[44px] font-bold text-black'>Home</h1>
            <Timestamp
              date={dayjs().format('dddd, MMMM DD, YYYY')}
              time={dayjs().format('HH:mm A')}
            />
          </div>

          <Card className='relative z-10 w-full max-w-[660px] overflow-hidden'>
            <img
              src={DashboardImageElipse}
              alt='DashboardImageElipse'
              className='absolute -inset-y-20 -right-36 z-0 size-[265px] rounded-full object-cover'
            />
            <div className='w-full max-w-[560px]'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-lg font-bold text-[#3A3C40]'>
                  Welcome!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm font-medium text-[#777677]'>
                  Welcome to PayBender! We’re excited for you to utilize our
                  products!
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className='flex w-full items-start gap-[30px]'>
          <div className='w-1/2'>
            <div className='grid grid-cols-1 gap-[30px] lg:grid-cols-2'>
              {/* <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                  <CardTitle>
                    <h2 className='text-lg font-medium text-[#3A3C40]'>
                      Set Up Payment Channel
                    </h2>
                    <p className='text-xs text-[#82868C]'>Set Up</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-y-[20px]'>
                    <h3 className='text-sm font-medium text-[#777677]'>
                      Set Up your payment channel
                    </h3>
                    <Button className='w-full bg-[#3CC1D1] text-xs text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'>
                      Set Up
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
              {/* <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                  <CardTitle>
                    <h2 className='text-lg font-medium text-[#3A3C40]'>
                      Set Up Account
                    </h2>
                    <p className='text-xs text-[#82868C]'>
                      Set Up Your Account
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-y-[20px]'>
                    <h3 className='text-sm font-medium text-[#777677]'>
                      Set Up Account and Role Within Your Company
                    </h3>
                    <Button className='w-full bg-[#3CC1D1] text-xs text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'>
                      Set Up
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                  <CardTitle>
                    <div className='flex items-center gap-x-2.5'>
                      <img src={IconSync} alt='Sync' className='size-7' />
                      <h2 className='text-lg font-medium text-[#3A3C40]'>
                        Test Mode Enable
                      </h2>
                    </div>
                    <p className='text-xs text-[#82868C]'>Test Mode</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-y-[20px]'>
                    <h3 className='text-sm font-medium text-[#777677]'>
                      You may try out dashboard in testmode
                    </h3>
                    <Button
                      className='w-full bg-[#3CC1D1] text-xs text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
                      onClick={() => navigate('/app/get-started/test-mode')}
                    >
                      Try
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                  <CardTitle>
                    <h2 className='text-lg font-medium text-[#3A3C40]'>
                      Live Payment
                    </h2>
                    <p className='text-xs text-[#82868C]'>Test Mode</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-y-[20px]'>
                    <h3 className='text-sm font-medium text-[#777677]'>
                      Track Live Payment in Transaction Menu
                    </h3>
                    <Button
                      className='w-full bg-transparent text-xs text-[#3CC1D1] hover:bg-transparent hover:text-[#3CC1D1]/90 focus:bg-transparent focus:text-[#3CC1D1]/90'
                      variant='ghost'
                    >
                      Transaction Menu
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
          <div className='w-1/2'>
            <div className='grid grid-cols-1 gap-[30px] lg:grid-cols-2'>
              {/* <Card className='w-full h-auto'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                  <CardTitle>
                    <img
                      src={IconAdsClick}
                      alt='Ads Click'
                      className='size-7'
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-y-2'>
                    <h3 className='text-sm font-medium text-[#82868C]'>
                      Hit Transaction Test
                    </h3>
                    <p className='text-lg text-[#3A3C40]'>0/10</p>
                  </div>
                </CardContent>
              </Card> */}
              {/* <Card className='w-full h-auto'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                  <CardTitle>
                    <img
                      src={IconAdsClick}
                      alt='Ads Click'
                      className='size-7'
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-y-2'>
                    <h3 className='text-sm font-medium text-[#82868C]'>
                      Icon Report Test
                    </h3>
                    <p className='text-lg text-[#3A3C40]'>0/10</p>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>

        {/* <div className='mt-10'>
          <h1 className='mb-10 text-2xl font-medium text-black'>
            DOCUMENTATION
          </h1>

          <div className='flex items-center gap-[30px]'>
            <div className='w-full lg:w-1/2'>
              <div className='grid grid-cols-2 gap-[30px]'>
                <Card className='w-full h-auto'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                    <CardTitle>
                      <div className='flex items-center gap-x-2.5'>
                        <img src={IconSync} alt='Sync' className='size-7' />
                        <h2 className='text-lg font-medium text-[#3A3C40]'>
                          Basic API Documentation
                        </h2>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className='w-full bg-[#3CC1D1] text-xs text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'>
                      View
                    </Button>
                  </CardContent>
                </Card>
                <Card className='w-full h-auto'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-[18px]'>
                    <CardTitle>
                      <div className='flex items-center gap-x-2.5'>
                        <img src={IconSync} alt='Sync' className='size-7' />
                        <h2 className='text-lg font-medium text-[#3A3C40]'>
                          Payment Page
                        </h2>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className='w-full bg-[#3CC1D1] text-xs text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'>
                      View
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div> */}
      </Layout.Body>
    </Layout>
  )
}
