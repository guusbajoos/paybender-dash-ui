import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import routesConfig from '@/routes'
import useAuth from '@/store/use-auth'

const AppRoute = () => {
  const auth = useAuth((state) => state)
  const routes = useRoutes(routesConfig)

  useEffect(() => {
    const evtFn = () => {
      window.location.reload()
    }
    window.addEventListener('APP_AUTH_UNAUTHORIZED', evtFn)

    return () => {
      window.removeEventListener('APP_AUTH_UNAUTHORIZED', evtFn)
    }
  }, [])

  return auth.isAuthReady ? routes : null
}

export default AppRoute
