import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error'
import NotFoundError from '@/pages/errors/not-found-error'
import MaintenanceError from '@/pages/errors/maintenance-error'
import UnauthorisedError from '@/pages/errors/unauthorised-error.tsx'

import AuthLayout from '@/components/partials/auth/auth-layout'
import AuthGate from '@/components/partials/auth/auth-gate'
import AppShell from '@/components/app-shell'

const routesConfig: RouteObject[] = [
  {
    index: true,
    element: <Navigate to='/auth/login' />,
  },
  {
    path: 'auth',
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        path: 'login',
        lazy: async () => ({
          Component: (await import('@/pages/auth/login')).default,
        }),
      },
      {
        path: 'register',
        lazy: async () => ({
          Component: (await import('@/pages/auth/register')).default,
        }),
      },
    ],
  },
  {
    path: 'app',
    element: (
      <AuthGate>
        <AppShell>
          <Outlet />
        </AppShell>
      </AuthGate>
    ),
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: 'get-started',
        element: (
          <div>
            <h1>Get Started Page</h1>
            <p>Some introductory content for the Get Started page.</p>
            <Outlet /> {/* This will render the child routes like test-mode */}
          </div>
        ),
        children: [
          {
            path: 'test-mode',
            element: (
              <div>
                <h2>Test Mode</h2>
                <Outlet /> {/* This renders the children like pay-in/pay-out */}
              </div>
            ),
            children: [
              {
                path: 'pay-in',
                element: <p>pay-in</p>,
              },
              {
                path: 'pay-out',
                element: <p>pay-out</p>,
              },
            ],
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]

export default routesConfig
