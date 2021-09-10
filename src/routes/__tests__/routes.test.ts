import { getNetworkName } from 'src/config'
import { getNetworkNameSlug, history, redirectLegacyRoutes } from '../routes'

describe('getNetworkNameSlug', () => {
  it('returns a lowercase networkName slug', () => {
    const network = getNetworkName()
    expect(getNetworkNameSlug()).toBe(network.toLowerCase())
  })
})

describe('redirectLegacyRoutes', () => {
  const oldUrl = 'https://rinkeby.gnosis-safe.io/app/#/safes/0x5f9ee776B85f1aFF123f935C48C528D00a62B0ad'
  const newUrl = 'https://gnosis-safe.io/app/rinkeby/safes/0x5f9ee776B85f1aFF123f935C48C528D00a62B0ad'

  const getAfterHost = (url: string) => {
    const { pathname, hash, search } = new URL(url)
    return `${pathname}${hash}${search}`
  }

  it('should redirect legacy hash routes to have the blockhain in the pathname', () => {
    history.push(getAfterHost(oldUrl))
    redirectLegacyRoutes()
    expect(history.location.pathname).toBe(new URL(newUrl).pathname)
  })
})
