import { getNetworkName } from 'src/config'

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
