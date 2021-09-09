import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { generatePath, Router } from 'react-router'
import { getNetworkNameSlug, SAFE_ROUTES } from 'src/routes/routes'
import ChainRoute from '..'
import { LEGACY_SAFE_ROUTES } from 'src/routes/legacy/routes'
import { createMemoryHistory } from 'history'

describe('ChainRoute', () => {
  const routes = Object.values(SAFE_ROUTES)
  const legacyRoutes = Object.values(LEGACY_SAFE_ROUTES)

  const getRandomRoute = (routes: string[]) => {
    const randomIndex = Math.floor(Math.random() * routes.length)
    return generatePath(routes[randomIndex], { networkName: getNetworkNameSlug(), safeAddress: 'xyz' })
  }

  // Must add providers as Router is there with custom history
  const renderInRouter = (path: string | string[]) => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ChainRoute path={path} render={({ location }) => <>{location.pathname}</>} />
      </Router>,
    )
    return history
  }
  it('should render any route if only one is given', async () => {
    const testRoute = '/test'

    const history = renderInRouter(testRoute)
    history.push(testRoute)

    await waitFor(() => {
      // const route = screen.findByText(testRoute)
      // expect(route).toBeInTheDocument()
      expect(history.location.pathname).toBe(testRoute)
    })
  })
  it('should render routes containing the /:networkName slug', async () => {
    const currentRoute = getRandomRoute(routes)
    const legacyRoute = getRandomRoute(legacyRoutes)

    const history = renderInRouter([currentRoute, legacyRoute])
    history.push(legacyRoute)

    await waitFor(() => {
      // const route = screen.findByText(currentRoute)
      // expect(route).toBeInTheDocument()
      expect(history.location.pathname).toBe(currentRoute)
    })
  })

  it('should render routes containing the current chain name', async () => {
    const currentRoute = getRandomRoute(routes)
    const legacyRoute = getRandomRoute(legacyRoutes)

    const history = renderInRouter([currentRoute, legacyRoute])
    history.push(legacyRoute)

    await waitFor(() => {
      // const route = screen.findByText(currentRoute)
      // expect(route).toBeInTheDocument()
      expect(history.location.pathname).toBe(currentRoute)
    })
  })
})
