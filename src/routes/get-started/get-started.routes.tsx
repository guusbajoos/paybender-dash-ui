import { RouteObject } from 'react-router-dom'

import Dashboard from '@/pages/dashboard'
import testModeRoutes from './test-mode.routes'

const getStartedRoutes: RouteObject[] = [
  {
    path: '',
    element: <Dashboard />,
    children: testModeRoutes,
  },
]

export default getStartedRoutes
