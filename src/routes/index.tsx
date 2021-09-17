import React from 'react'
import { Loader } from '@gnosis.pm/safe-react-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'

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
      const safePage = generatePath(SAFELIST_ROUTE, {
        networkName: getNetworkNameSlug(),
        // prevent logging safeAddress
        safeAddress: 'SAFE_ADDRESS',
        ...(matchSafeWithAction.params?.safeAction && {
          safeAction: matchSafeWithAction.params.safeAction,
        }),
      })

      trackPage(safePage)
    } else {
      const page = `${location.pathname}${location.search}`
      trackPage(page)
    }
  }, [location, matchSafeWithAction, trackPage])

  return (
    <Switch>
      <Route
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
      <Route component={Welcome} exact path={WELCOME_ROUTE} />
      <Route component={Open} exact path={OPEN_ROUTE} />
      <Route component={Safe} path={BASE_SAFE_ROUTE} />
      <Route component={Load} path={`${LOAD_ROUTE}/:safeAddress?`} />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
