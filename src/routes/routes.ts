import { getNetworkName } from 'src/config'

export const getNetworkNameSlug = (): string => getNetworkName().toLowerCase()

export const SAFE_ADDRESS_SLUG = 'address'
export const SAFE_NETWORK_NAME_SLUG = 'networkName'
export const SAFE_SAFE_ADDRESS_SLUG = 'safeAddress'

export const SAFELIST_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/safes`
export const OPEN_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/open`
export const LOAD_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/load`
export const WELCOME_ROUTE = `/:${SAFE_NETWORK_NAME_SLUG}/welcome`

const baseSafeRoute = `${SAFELIST_ROUTE}/:${SAFE_SAFE_ADDRESS_SLUG}`

export const SAFE_ROUTES = {
  ASSETS_BASE_ROUTE: `${baseSafeRoute}/balances`,
  ASSETS_BALANCES: `${baseSafeRoute}/balances`,
  ASSETS_COLLECTIBLES: `${baseSafeRoute}/balances/collectibles`,
  TRANSACTIONS: `${baseSafeRoute}/transactions`,
  ADDRESS_BOOK: `${baseSafeRoute}/address-book`,
  APPS: `${baseSafeRoute}/apps`,
  SETTINGS_BASE_ROUTE: `${baseSafeRoute}/settings`,
  SETTINGS_DETAILS: `${baseSafeRoute}/settings/details`,
  SETTINGS_OWNERS: `${baseSafeRoute}/settings/owners`,
  SETTINGS_POLICIES: `${baseSafeRoute}/settings/owners`,
  SETTINGS_SPENDING_LIMIT: `${baseSafeRoute}/settings/spending-limit`,
  SETTINGS_ADVANCED: `${baseSafeRoute}/settings/advanced`,
}
