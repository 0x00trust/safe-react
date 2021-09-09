import React from 'react'
import { generatePath, Route, RouteProps, useParams } from 'react-router'
import { LEGACY_SAFE_ROUTES } from './routes'

// Path is required
type Props = Omit<RouteProps, 'path'> & { path: string | string[] }

const FilterLegacyRoutesRoute = ({ path, ...rest }: Props) => {
  const routes = Array.isArray(path) ? path : [path]
  const slugs = useParams()

  const legacyRoutes = Object.values(LEGACY_SAFE_ROUTES)
  const hasLegacyRoute = legacyRoutes.some((legacy) => routes.some((route) => route === legacy))

  if (hasLegacyRoute) {
    // Remove legacy routes and update slugs to match current routes
    const currentRoutes = routes.filter(legacyRoutes.includes).map((route) => generatePath(route, slugs))
    return <Route path={currentRoutes} {...rest} />
  }

  // Slugs do not need to be updated as they match current routes
  return <Route path={path} {...rest} />
}

export default FilterLegacyRoutesRoute
