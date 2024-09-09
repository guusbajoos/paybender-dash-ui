import { useLocation } from 'react-router-dom'

export default function useCheckActiveNav() {
  const { pathname } = useLocation()

  // Normalize and remove any leading slashes for comparison
  const getPathSegments = () =>
    pathname.replace('/app', '').split('/').filter(Boolean)

  const checkActiveNav = (nav: string) => {
    const pathSegments = getPathSegments()

    if (nav === '/app' && pathSegments.length === 0) return true // Active if root

    // Check if the path segment matches the nav without leading slashes
    const cleanNav = nav.replace('/app', '').replace(/^\//, '')
    return pathSegments.includes(cleanNav)
  }

  return { checkActiveNav }
}
