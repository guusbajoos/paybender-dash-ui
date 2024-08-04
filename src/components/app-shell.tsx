import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className='relative h-full overflow-hidden'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-24 transition-[margin] lg:overflow-y-hidden lg:pt-0 ${isCollapsed ? 'lg:ml-14' : 'lg:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
