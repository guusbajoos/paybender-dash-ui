import { PropsWithChildren } from 'react'
import Sidebar from '@/components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { Layout } from '@/components/custom/layout'
import Timestamp from './timestamp'
import { UserNav } from './user-nav'
import dayjs from 'dayjs'

export default function AppShell(props: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className='relative h-full overflow-hidden'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-24 transition-[margin] lg:overflow-y-hidden lg:pt-0 ${isCollapsed ? 'lg:ml-14' : 'lg:ml-64'} h-full`}
      >
        <Layout className='bg-[#EEF9FA]'>
          <Layout.Header className='shadow-sm'>
            <Timestamp
              date={dayjs().format('dddd, MMMM DD, YYYY')}
              time={dayjs().format('HH:mm A')}
            />
            <div className='ml-auto flex items-center space-x-4'>
              <UserNav />
            </div>
          </Layout.Header>

          <Layout.Body>{props.children}</Layout.Body>
        </Layout>
      </main>
    </div>
  )
}
