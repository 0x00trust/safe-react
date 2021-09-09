import { matchPath } from 'react-router-dom'
import { SAFELIST_ROUTE } from 'src/routes/routes'
import { checksumAddress } from './checksumAddress'
import { history } from '../routes/routes'

export const safeAddressFromUrl = (): string => {
  const match = matchPath<{ safeAddress: string }>(history.location.pathname, {
    path: `${SAFELIST_ROUTE}/:safeAddress`,
  })

  if (match) {
    return checksumAddress(match.params.safeAddress).toString()
  }

  return ''
}
