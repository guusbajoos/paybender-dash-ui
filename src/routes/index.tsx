import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error'
import NotFoundError from '@/pages/errors/not-found-error'
import MaintenanceError from '@/pages/errors/maintenance-error'
import UnauthorisedError from '@/pages/errors/unauthorised-error.tsx'

import AuthLayout from '@/components/partials/auth/auth-layout'
import AuthGate from '@/components/partials/auth/auth-gate'
import AuthLoginPage from '@/pages/auth/login'
import AuthRegisterPage from '@/pages/auth/register'
import AppShell from '@/components/app-shell'
import getStartedRoutes from './get-started/get-started.routes'
import AuthenticatedGate from '@/components/partials/auth/authenticated-gate'

const routesConfig: RouteObject[] = [
  {
    index: true,
    element: <Navigate to='/auth/login' />,
  },
  {
    path: 'auth',
    element: (
      <AuthGate>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </AuthGate>
    ),
    children: [
      {
        path: 'login',
        Component: AuthLoginPage,
      },
      {
        path: 'register',
        Component: AuthRegisterPage,
      },
    ],
  },
  {
    path: 'app',
    element: (
      <AuthenticatedGate>
        <AppShell>
          <Outlet />
        </AppShell>
      </AuthenticatedGate>
    ),
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: 'get-started',
        element: <Outlet />,
        children: getStartedRoutes,
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
