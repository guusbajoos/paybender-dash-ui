import { useRoutes } from 'react-router-dom'

import routesConfig from '@/routes'
import useAuth from '@/store/use-auth'

const AppRoute = () => {
  const auth = useAuth((state) => state)
  const routes = useRoutes(routesConfig)

  return auth.isAuthReady ? routes : null
}

export default AppRoute
