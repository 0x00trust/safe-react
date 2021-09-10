import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { generatePath, Router } from 'react-router'
import ChainRoute from '..'
import { LEGACY_SAFE_ROUTES } from 'src/routes/legacy/routes'
import { createMemoryHistory } from 'history'
import { SAFE_ROUTES, getNetworkNameSlug } from 'src/routes/routes'

describe('ChainRoute', () => {
  const currentRoute = generatePath(SAFE_ROUTES.ASSETS_BASE_ROUTE, {
    networkName: getNetworkNameSlug(),
    safeAddress: 'testSafeAddress',
  })
  const legacyRoute = generatePath(LEGACY_SAFE_ROUTES.ASSETS_BASE_ROUTE, {
    networkName: getNetworkNameSlug(),
    safeAddress: 'testSafeAddress',
  })

  const renderInRouter = (path: string | string[]) => {
    const browserHistory = createMemoryHistory()

    render(
      <Router history={browserHistory}>
        <ChainRoute path={path} />
      </Router>,
    )

    return browserHistory
  }
  it('should render any route if only one is given', async () => {
    const testRoute = '/test'

    const { location } = renderInRouter(testRoute)
    expect(location.pathname).toBe(testRoute)
  })
  it('should render routes containing the /:networkName slug', async () => {
    const { location } = renderInRouter([currentRoute, legacyRoute])
    expect(location.pathname).toBe(currentRoute)
  })

  it('should render routes containing the current chain name', async () => {
    const { location } = renderInRouter([currentRoute, legacyRoute])
    expect(location.pathname).toBe(currentRoute)
  })
})
