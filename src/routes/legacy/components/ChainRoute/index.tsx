import React from 'react'
import { Route, RouteProps } from 'react-router'
import { getNetworkNameSlug, SAFE_NETWORK_NAME_SLUG } from 'src/routes/routes'

type Props = Omit<RouteProps, 'path'> & { path: string | string[] }

// Like React Router's Route, but filters legacy paths without /:networkName slug
const ChainRoute = ({ path, ...rest }: Props): React.ReactElement => {
  const routes = Array.isArray(path) ? path : [path]
  const currentRoutes = routes.filter((route) => route.startsWith(`:${SAFE_NETWORK_NAME_SLUG}` || getNetworkNameSlug()))

  return <Route path={currentRoutes} {...rest} />
}

export default ChainRoute
