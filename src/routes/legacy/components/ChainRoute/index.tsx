import React from 'react'
import { Route, RouteProps } from 'react-router'
import { getNetworkNameSlug, SAFE_NETWORK_NAME_SLUG } from 'src/routes/routes'

type Props = Omit<RouteProps, 'path'> & { path: string | string[] }

// Like React Router's Route, but filters legacy paths without /:networkName slug
const ChainRoute = ({ path, ...rest }: Props) => {
  const route = Array.isArray(path)
    ? path.filter((route) => route.startsWith(`:${SAFE_NETWORK_NAME_SLUG}` || getNetworkNameSlug()))
    : path

  return <Route path={route} {...rest} />
}

export default ChainRoute
