import React from 'react'
import { Route, RouteProps, useHistory, useLocation } from 'react-router'
import { getNetworkNameSlug, SAFE_NETWORK_NAME_SLUG } from 'src/routes/routes'

type Props = Omit<RouteProps, 'path'> & { path: string | string[] }

const isCurrentRoute = (route: string) =>
  [`:${SAFE_NETWORK_NAME_SLUG}`, getNetworkNameSlug()].some((networkName) =>
    [networkName, `/${networkName}`].some((slug) => route.startsWith(slug)),
  )

// Like React Router's Route, but filters legacy paths without /:networkName slug
const ChainRoute = (props: Props) => {
  const { path, ...rest } = props
  const { pathname } = useLocation()
  const history = useHistory()

  if (Array.isArray(path) && path.length > 0) {
    const [currentRoutes, legacyRoutes] = path.reduce(
      ([current, legacy], route) =>
        isCurrentRoute(route) ? [[...current, route], legacy] : [current, [...legacy, route]],
      [[], []],
    )

    const hasCurrentRoutes = currentRoutes.length > 0
    const hasLegacyRoutes = legacyRoutes.length > 0

    if (hasCurrentRoutes && !isCurrentRoute(pathname)) {
      history.replace(currentRoutes[0])
    }

    const routes = hasCurrentRoutes ? currentRoutes : hasLegacyRoutes ? legacyRoutes : path

    return <Route path={routes} {...rest} />
  }

  return <Route {...props} />
}

export default ChainRoute
