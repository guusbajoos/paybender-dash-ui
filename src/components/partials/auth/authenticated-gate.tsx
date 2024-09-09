import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '@/store/use-auth'

const AuthenticatedGate = () => {
  const auth = useAuth((state) => state)

  return !auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to='/app/get-started' />
  )
}

export default AuthenticatedGate
