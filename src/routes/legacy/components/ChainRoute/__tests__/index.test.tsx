import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { getNetworkNameSlug } from 'src/routes/routes'
import ChainRoute from '..'

describe('ChainRoute', () => {
  it('should render any route if only one is given', () => {
    const testRoute = '/not/a/slug/but/only/one/route'

    render(<ChainRoute path={testRoute} />, { wrapper: BrowserRouter })
    expect(window.location.pathname).toBe(testRoute)
  })
  it('should render routes containing the /:networkName slug', () => {
    const testChainRoute = '/:networkName/test'
    const testRoute = '/no/network/name/slug'

    render(<ChainRoute path={[testRoute, testChainRoute]} />, { wrapper: BrowserRouter })
    expect(window.location.pathname).toBe(testChainRoute)
  })

  it('should render routes containing the current chain name', () => {
    expect(window.location.pathname).toBe('/')

    const network = getNetworkNameSlug()

    const testChainRoute = `${network}/test`
    const testRoute = '/no/chain'

    render(<ChainRoute path={[testRoute, testChainRoute]} />, { wrapper: BrowserRouter })
    expect(window.location.pathname).toBe(testChainRoute)
  })
})
