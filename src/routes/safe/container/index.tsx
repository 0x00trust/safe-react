import { GenericModal, Loader } from '@gnosis.pm/safe-react-components'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, Redirect, Switch } from 'react-router-dom'
import { currentSafeFeaturesEnabled, currentSafeOwners } from 'src/logic/safe/store/selectors'
import { wrapInSuspense } from 'src/utils/wrapInSuspense'
import { getNetworkNameSlug, SAFE_ROUTES } from 'src/routes/routes'
import { FEATURES } from 'src/config/networks/network.d'
import { LoadingContainer } from 'src/components/LoaderContainer'
import { LEGACY_SAFE_ROUTES } from 'src/routes/legacy/routes'
import FilterLegacyRoutesRoute from 'src/routes/legacy/FilterLegacyRoutesRoute'
import { safeAddressFromUrl } from 'src/utils/router'

export const BALANCES_TAB_BTN_TEST_ID = 'balances-tab-btn'
export const SETTINGS_TAB_BTN_TEST_ID = 'settings-tab-btn'
export const APPS_TAB_BTN_TEST_ID = 'apps-tab-btn'
export const TRANSACTIONS_TAB_BTN_TEST_ID = 'transactions-tab-btn'
export const ADDRESS_BOOK_TAB_BTN_TEST_ID = 'address-book-tab-btn'
export const SAFE_VIEW_NAME_HEADING_TEST_ID = 'safe-name-heading'
export const TRANSACTIONS_TAB_NEW_BTN_TEST_ID = 'transactions-tab-new-btn'

const Apps = React.lazy(() => import('src/routes/safe/components/Apps'))
const Settings = React.lazy(() => import('src/routes/safe/components/Settings'))
const Balances = React.lazy(() => import('src/routes/safe/components/Balances'))
const TxList = React.lazy(() => import('src/routes/safe/components/Transactions/TxList'))
const AddressBookTable = React.lazy(() => import('src/routes/safe/components/AddressBook'))

const Container = (): React.ReactElement => {
  const safeAddress = safeAddressFromUrl()
  const featuresEnabled = useSelector(currentSafeFeaturesEnabled)
  const owners = useSelector(currentSafeOwners)
  const isSafeLoaded = owners.length > 0

  const [modal, setModal] = useState({
    isOpen: false,
    title: null,
    body: null,
    footer: null,
    onClose: () => {},
  })

  if (!isSafeLoaded) {
    return (
      <LoadingContainer>
        <Loader size="md" />
      </LoadingContainer>
    )
  }

  const baseRouteSlugs = {
    networkName: getNetworkNameSlug(),
    safeAddress,
  }

  const closeGenericModal = () => {
    if (modal.onClose) {
      modal.onClose?.()
    }

    setModal({
      isOpen: false,
      title: null,
      body: null,
      footer: null,
      onClose: () => {},
    })
  }

  return (
    <>
      <Switch>
        <FilterLegacyRoutesRoute
          exact
          path={[SAFE_ROUTES.ASSETS_BASE_ROUTE, LEGACY_SAFE_ROUTES.ASSETS_BASE_ROUTE].map(
            (path) => `${path}/:assetType?`,
          )}
          render={() => wrapInSuspense(<Balances />, null)}
        />
        <FilterLegacyRoutesRoute
          exact
          path={[SAFE_ROUTES.TRANSACTIONS, LEGACY_SAFE_ROUTES.TRANSACTIONS]}
          render={() => wrapInSuspense(<TxList />, null)}
        />
        <FilterLegacyRoutesRoute
          exact
          path={[SAFE_ROUTES.ADDRESS_BOOK, LEGACY_SAFE_ROUTES.ADDRESS_BOOK]}
          render={() => wrapInSuspense(<AddressBookTable />, null)}
        />
        <FilterLegacyRoutesRoute
          exact
          path={[SAFE_ROUTES.APPS, LEGACY_SAFE_ROUTES.APPS]}
          render={({ history }) => {
            if (!featuresEnabled.includes(FEATURES.SAFE_APPS)) {
              history.push(generatePath(SAFE_ROUTES.ASSETS_BALANCES, baseRouteSlugs))
            }
            return wrapInSuspense(<Apps />, null)
          }}
        />
        <FilterLegacyRoutesRoute
          exact
          path={[SAFE_ROUTES.SETTINGS_BASE_ROUTE, LEGACY_SAFE_ROUTES.SETTINGS_BASE_ROUTE]}
          render={() => wrapInSuspense(<Settings />, null)}
        />
        <Redirect to={generatePath(SAFE_ROUTES.ASSETS_BALANCES, baseRouteSlugs)} />
      </Switch>
      {modal.isOpen && <GenericModal {...modal} onClose={closeGenericModal} />}
    </>
  )
}

export default Container
