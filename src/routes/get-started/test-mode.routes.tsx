import { RouteObject } from 'react-router-dom'

import TestMode from '@/pages/dashboard/test-mode'
import PayIn from '@/pages/dashboard/test-mode/pay-in'
import PayOut from '@/pages/dashboard/test-mode/pay-out'

const testModeRoutes: RouteObject[] = [
  {
    path: 'test-mode',
    element: <TestMode />,
    children: [
      {
        path: 'pay-in',
        element: <PayIn />,
      },
      {
        path: 'pay-out',
        element: <PayOut />,
      },
    ],
  },
]

export default testModeRoutes
