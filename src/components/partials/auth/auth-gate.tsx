import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '@/store/use-auth'

const AuthGate = (props: PropsWithChildren) => {
  const navigate = useNavigate()
  const auth = useAuth((state) => state)

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth/login')
    }
  }, [auth.isAuthenticated])

  return auth.isAuthReady ? props.children : null
}

export default AuthGate
