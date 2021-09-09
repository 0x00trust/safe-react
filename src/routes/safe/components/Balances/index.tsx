import { Breadcrumb, BreadcrumbElement, Menu } from '@gnosis.pm/safe-react-components'
import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, Redirect, Switch, useRouteMatch } from 'react-router-dom'

import Col from 'src/components/layout/Col'
import Modal from 'src/components/Modal'
import ReceiveModal from 'src/components/App/ReceiveModal'

import { SAFE_ROUTES, SAFELIST_ROUTE, getNetworkNameSlug } from 'src/routes/routes'
import SendModal from 'src/routes/safe/components/Balances/SendModal'
import { CurrencyDropdown } from 'src/routes/safe/components/CurrencyDropdown'
import { currentSafeWithNames } from 'src/logic/safe/store/selectors'

import { wrapInSuspense } from 'src/utils/wrapInSuspense'
import { FEATURES } from 'src/config/networks/network.d'
import { LEGACY_SAFE_ROUTES } from 'src/routes/legacy/routes'
import FilterLegacyRoutesRoute from 'src/routes/legacy/FilterLegacyRoutesRoute'

const Collectibles = React.lazy(() => import('src/routes/safe/components/Balances/Collectibles'))
const Coins = React.lazy(() => import('src/routes/safe/components/Balances/Coins'))

export const MANAGE_TOKENS_BUTTON_TEST_ID = 'manage-tokens-btn'
export const BALANCE_ROW_TEST_ID = 'balance-row'

const INITIAL_STATE = {
  erc721Enabled: false,
  showToken: false,
  sendFunds: {
    isOpen: false,
    selectedToken: '',
  },
  showReceive: false,
}

export const COINS_LOCATION_REGEX = /\/balances\/?$/
export const COLLECTIBLES_LOCATION_REGEX = /\/balances\/collectibles$/

const Balances = (): ReactElement => {
  const [state, setState] = useState(INITIAL_STATE)
  const matchSafeWithAction = useRouteMatch({
    path: `${SAFELIST_ROUTE}/:safeAddress/:safeAction/:safeSubaction?`,
  }) as {
    url: string
    params: Record<string, string>
  }

  const { address: safeAddress, featuresEnabled, name: safeName } = useSelector(currentSafeWithNames)

  useEffect(() => {
    const erc721Enabled = Boolean(featuresEnabled?.includes(FEATURES.ERC721))

    setState((prevState) => ({
      ...prevState,
      erc721Enabled,
    }))
  }, [featuresEnabled])

  const onShow = (action) => {
    setState((prevState) => ({ ...prevState, [`show${action}`]: true }))
  }

  const onHide = (action) => {
    setState((prevState) => ({ ...prevState, [`show${action}`]: false }))
  }

  const showSendFunds = (tokenAddress: string): void => {
    setState((prevState) => ({
      ...prevState,
      sendFunds: {
        isOpen: true,
        selectedToken: tokenAddress,
      },
    }))
  }

  const hideSendFunds = () => {
    setState((prevState) => ({
      ...prevState,
      sendFunds: {
        isOpen: false,
        selectedToken: '',
      },
    }))
  }

  const { erc721Enabled, sendFunds, showReceive } = state

  const baseRouteSlugs = {
    networkName: getNetworkNameSlug(),
    safeAddress,
  }

  let balancesSection
  switch (matchSafeWithAction.url) {
    case generatePath(SAFE_ROUTES.ASSETS_BALANCES, baseRouteSlugs):
      balancesSection = 'Coins'
      break
    case generatePath(SAFE_ROUTES.ASSETS_COLLECTIBLES, baseRouteSlugs):
      balancesSection = 'Collectibles'
      break
    default:
      balancesSection = ''
  }

  return (
    <>
      <Menu>
        <Col start="sm" sm={6} xs={12}>
          <Breadcrumb>
            <BreadcrumbElement iconType="assets" text="ASSETS" color="primary" />
            <BreadcrumbElement text={balancesSection} color="placeHolder" />
          </Breadcrumb>
        </Col>
        <Switch>
          <FilterLegacyRoutesRoute
            path={[SAFE_ROUTES.ASSETS_COLLECTIBLES, LEGACY_SAFE_ROUTES.ASSETS_COLLECTIBLES]}
            exact
            render={() => {
              return !erc721Enabled ? (
                <Redirect to={generatePath(SAFE_ROUTES.ASSETS_BALANCES, baseRouteSlugs)} />
              ) : (
                <Col end="sm" sm={6} xs={12}></Col>
              )
            }}
          />
          <FilterLegacyRoutesRoute
            path={[SAFE_ROUTES.ASSETS_BALANCES, LEGACY_SAFE_ROUTES.ASSETS_BALANCES]}
            exact
            render={() => (
              <Col end="sm" sm={6} xs={12}>
                <CurrencyDropdown />
              </Col>
            )}
          />
        </Switch>
      </Menu>
      <Switch>
        <FilterLegacyRoutesRoute
          path={[SAFE_ROUTES.ASSETS_COLLECTIBLES, LEGACY_SAFE_ROUTES.ASSETS_COLLECTIBLES]}
          exact
          render={() => {
            if (erc721Enabled) {
              return wrapInSuspense(<Collectibles />)
            }
            return null
          }}
        />
        <FilterLegacyRoutesRoute
          path={[SAFE_ROUTES.ASSETS_BALANCES, LEGACY_SAFE_ROUTES.ASSETS_BALANCES]}
          render={() => {
            return wrapInSuspense(<Coins showReceiveFunds={() => onShow('Receive')} showSendFunds={showSendFunds} />)
          }}
        />
      </Switch>
      <SendModal
        activeScreenType="sendFunds"
        isOpen={sendFunds.isOpen}
        onClose={hideSendFunds}
        selectedToken={sendFunds.selectedToken}
      />
      <Modal
        description="Receive Tokens Form"
        handleClose={() => onHide('Receive')}
        open={showReceive}
        paperClassName="receive-modal"
        title="Receive Tokens"
      >
        <ReceiveModal safeAddress={safeAddress} safeName={safeName} onClose={() => onHide('Receive')} />
      </Modal>
    </>
  )
}

export default Balances
