import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error'
import NotFoundError from '@/pages/errors/not-found-error'
import MaintenanceError from '@/pages/errors/maintenance-error'
import UnauthorisedError from '@/pages/errors/unauthorised-error.tsx'
import AuthLayout from './components/partials/auth/auth-layout'

const router = createBrowserRouter([
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
    path: '/',
    lazy: async () => {
      const AppShell = await import('@/components/app-shell')
      return { Component: AppShell.default }
    },
    children: [
      {
        path: 'get-started',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard')).default,
        }),
      },
      {
        path: 'get-started/test-mode',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/test-mode')).default,
        }),
      },
      {
        path: 'get-started/test-mode/pay-in',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/test-mode/pay-in'))
            .default,
        }),
      },
      {
        path: 'get-started/test-mode/pay-out',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/test-mode/pay-out'))
            .default,
        }),
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
])

export default router
