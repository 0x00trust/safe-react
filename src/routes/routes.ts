import { createBrowserHistory } from 'history'
import { getNetworkName } from 'src/config'

export const history = createBrowserHistory()

export const getNetworkNameSlug = (): string => getNetworkName().toLowerCase()

export const SAFE_NETWORK_NAME_SLUG = 'networkName'
export const SAFE_SAFE_ADDRESS_SLUG = 'safeAddress'

export const SAFELIST_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/safes`
export const OPEN_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/open`
export const LOAD_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/load`
export const WELCOME_ROUTE = `/welcome`

export const BASE_SAFE_ROUTE = `${SAFELIST_ROUTE}/:${SAFE_SAFE_ADDRESS_SLUG}`

export const SAFE_ROUTES = {
  ASSETS_BASE_ROUTE: `${BASE_SAFE_ROUTE}/balances`,
  ASSETS_BALANCES: `${BASE_SAFE_ROUTE}/balances`,
  ASSETS_COLLECTIBLES: `${BASE_SAFE_ROUTE}/balances/collectibles`,
  TRANSACTIONS: `${BASE_SAFE_ROUTE}/transactions`,
  ADDRESS_BOOK: `${BASE_SAFE_ROUTE}/address-book`,
  APPS: `${BASE_SAFE_ROUTE}/apps`,
  SETTINGS_BASE_ROUTE: `${BASE_SAFE_ROUTE}/settings`,
  SETTINGS_DETAILS: `${BASE_SAFE_ROUTE}/settings/details`,
  SETTINGS_OWNERS: `${BASE_SAFE_ROUTE}/settings/owners`,
  SETTINGS_POLICIES: `${BASE_SAFE_ROUTE}/settings/policies`,
  SETTINGS_SPENDING_LIMIT: `${BASE_SAFE_ROUTE}/settings/spending-limit`,
  SETTINGS_ADVANCED: `${BASE_SAFE_ROUTE}/settings/advanced`,
}

// Old URL: https://rinkeby.gnosis-safe.io/app/#/safes/0x5f9ee776B85f1aFF123f935C48C528D00a62B0ad
// New URL: https://gnosis-safe.io/app/rinkeby/safes/0x5f9ee776B85f1aFF123f935C48C528D00a62B0ad
export const redirectLegacyRoutes = () => {
  const { hash } = window.location
  if (!hash) return
  history.replace(`/${getNetworkNameSlug()}${hash.substr(1)}`)
}
