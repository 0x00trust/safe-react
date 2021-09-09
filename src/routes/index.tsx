import { Loader } from '@gnosis.pm/safe-react-components'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, Redirect, Switch, useLocation, useRouteMatch } from 'react-router-dom'

import {
  BASE_SAFE_ROUTE,
  getNetworkNameSlug,
  LOAD_ROUTE,
  OPEN_ROUTE,
  SAFELIST_ROUTE,
  SAFE_ROUTES,
  WELCOME_ROUTE,
} from 'src/routes/routes'

import { LoadingContainer } from 'src/components/LoaderContainer'
import { useAnalytics } from 'src/utils/googleAnalytics'
import { lastViewedSafe } from 'src/logic/currentSession/store/selectors'
import {
  LEGACY_BASE_SAFE_ROUTE,
  LEGACY_LOAD_ADDRESS,
  LEGACY_OPEN_ADDRESS,
  LEGACY_WELCOME_ADDRESS,
} from './legacy/routes'
import FilterLegacyRoutesRoute from './legacy/FilterLegacyRoutesRoute'

const Welcome = React.lazy(() => import('./welcome/container'))
const Open = React.lazy(() => import('./open/container/Open'))
const Safe = React.lazy(() => import('./safe/container'))
const Load = React.lazy(() => import('./load/container/Load'))

const Routes = (): React.ReactElement => {
  const [isInitialLoad, setInitialLoad] = useState(true)
  const location = useLocation()
  const matchSafeWithAction = useRouteMatch<{ safeAddress: string; safeAction: string }>({
    path: `${SAFELIST_ROUTE}/:safeAddress/:safeAction`,
  })

  const defaultSafe = useSelector(lastViewedSafe)
  const { trackPage } = useAnalytics()

  useEffect(() => {
    if (isInitialLoad && location.pathname !== '/') {
      setInitialLoad(false)
    }
  }, [location.pathname, isInitialLoad])

  useEffect(() => {
    if (matchSafeWithAction) {
      // prevent logging safeAddress
      let safePage = `${SAFELIST_ROUTE}/SAFE_ADDRESS`
      if (matchSafeWithAction.params?.safeAction) {
        safePage += `/${matchSafeWithAction.params?.safeAction}`
      }
      trackPage(safePage)
    } else {
      const page = `${location.pathname}${location.search}`
      trackPage(page)
    }
  }, [location, matchSafeWithAction, trackPage])

  return (
    <Switch>
      <FilterLegacyRoutesRoute
        exact
        path="/"
        render={() => {
          if (!isInitialLoad) {
            return <Redirect to={WELCOME_ROUTE} />
          }

          if (defaultSafe === null) {
            return (
              <LoadingContainer>
                <Loader size="md" />
              </LoadingContainer>
            )
          }

          if (defaultSafe) {
            return (
              <Redirect
                to={generatePath(SAFE_ROUTES.ASSETS_BALANCES, {
                  networkName: getNetworkNameSlug(),
                  safeAddress: defaultSafe,
                })}
              />
            )
          }

          return <Redirect to={WELCOME_ROUTE} />
        }}
      />
      <FilterLegacyRoutesRoute component={Welcome} exact path={[WELCOME_ROUTE, LEGACY_WELCOME_ADDRESS]} />
      <FilterLegacyRoutesRoute component={Open} exact path={[OPEN_ROUTE, LEGACY_OPEN_ADDRESS]} />
      <FilterLegacyRoutesRoute component={Safe} path={[BASE_SAFE_ROUTE, LEGACY_BASE_SAFE_ROUTE]} />
      <FilterLegacyRoutesRoute
        component={Load}
        path={[`${LOAD_ROUTE}/:safeAddress?`, `${LEGACY_LOAD_ADDRESS}/:safeAddress?`]}
      />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
