import { sendAnalyticsEvent, TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, InterfaceElementName, InterfaceEventName, SharedEventName } from '@uniswap/analytics-events'
import { useWeb3React } from '@web3-react/core'
import Column from 'components/Column'
import { useGetConnection } from 'connection'
import { useCallback, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Copy, IconProps, Power, Settings } from 'react-feather'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'
import styled, { useTheme } from 'styled-components/macro'
import { CopyHelper, ThemedText } from 'theme'

import { shortenAddress } from '../../nft/utils/address'
import { useFiatOnrampAvailability, useOpenModal } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/reducer'
import StatusIcon from '../Identicon/StatusIcon'
import { useToggleAccountDrawer } from '.'
import IconButton, { IconHoverText } from './IconButton'
import MiniPortfolio from './MiniPortfolio'

const AuthenticatedHeaderWrapper = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  & > a,
  & > button {
    margin-right: 8px;
  }

  & > button:last-child {
    margin-right: 0px;
    ${IconHoverText}:last-child {
      left: 0px;
    }
  }
`

const StatusWrapper = styled.div`
  display: inline-block;
  width: 70%;
  padding-right: 4px;
  display: inline-flex;
`

const AccountNamesWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`

const HeaderWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const CopyText = styled(CopyHelper).attrs({
  InitialIcon: Copy,
  CopiedIcon: Copy,
  gap: 4,
  iconSize: 14,
  iconPosition: 'right',
})``

const PortfolioDrawerContainer = styled(Column)`
  flex: 1;
`

export function PortfolioArrow({ change, ...rest }: { change: number } & IconProps) {
  const theme = useTheme()
  return change < 0 ? (
    <ArrowDownRight color={theme.accentCritical} size={20} {...rest} />
  ) : (
    <ArrowUpRight color={theme.accentSuccess} size={20} {...rest} />
  )
}

export default function AuthenticatedHeader({ account, openSettings }: { account: string; openSettings: () => void }) {
  const { connector, ENSName } = useWeb3React()
  const dispatch = useAppDispatch()

  const getConnection = useGetConnection()
  const connection = getConnection(connector)
  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
    dispatch(updateSelectedWallet({ wallet: undefined }))
  }, [connector, dispatch])

  const toggleWalletDrawer = useToggleAccountDrawer()

  const openFiatOnrampModal = useOpenModal(ApplicationModal.FIAT_ONRAMP)
  const openFoRModalWithAnalytics = useCallback(() => {
    toggleWalletDrawer()
    sendAnalyticsEvent(InterfaceEventName.FIAT_ONRAMP_WIDGET_OPENED)
    openFiatOnrampModal()
  }, [openFiatOnrampModal, toggleWalletDrawer])

  const [shouldCheck] = useState(false)
  useFiatOnrampAvailability(shouldCheck, openFoRModalWithAnalytics)

  return (
    <AuthenticatedHeaderWrapper>
      <HeaderWrapper>
        <StatusWrapper>
          <StatusIcon connection={connection} size={40} />
          {account && (
            <AccountNamesWrapper>
              <ThemedText.SubHeader color="textPrimary" fontWeight={500}>
                <CopyText toCopy={ENSName ?? account}>{ENSName ?? shortenAddress(account, 4, 4)}</CopyText>
              </ThemedText.SubHeader>
              {/* Displays smaller view of account if ENS name was rendered above */}
              {ENSName && (
                <ThemedText.BodySmall color="textTertiary">
                  <CopyText toCopy={account}>{shortenAddress(account, 4, 4)}</CopyText>
                </ThemedText.BodySmall>
              )}
            </AccountNamesWrapper>
          )}
        </StatusWrapper>
        <IconContainer>
          <IconButton data-testid="wallet-settings" onClick={openSettings} Icon={Settings} />
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.DISCONNECT_WALLET_BUTTON}
          >
            <IconButton data-testid="wallet-disconnect" onClick={disconnect} Icon={Power} />
          </TraceEvent>
        </IconContainer>
      </HeaderWrapper>
      <PortfolioDrawerContainer>
        {/* {totalBalance !== undefined ? (
          <FadeInColumn gap="xs">
            <ThemedText.HeadlineLarge fontWeight={500}>
              {formatNumber(totalBalance, NumberType.PortfolioBalance)}
            </ThemedText.HeadlineLarge>
            <AutoRow marginBottom="20px">
              {absoluteChange !== 0 && percentChange && (
                <>
                  <PortfolioArrow change={absoluteChange as number} />
                  <ThemedText.BodySecondary>
                    {`${formatNumber(Math.abs(absoluteChange as number), NumberType.PortfolioBalance)} (${formatDelta(
                      percentChange
                    )})`}
                  </ThemedText.BodySecondary>
                </>
              )}
            </AutoRow>
          </FadeInColumn>
        ) : (
          <Column gap="xs">
            <LoadingBubble height="44px" width="170px" />
            <LoadingBubble height="16px" width="100px" margin="4px 0 20px 0" />
          </Column>
        )} */}
        {/* {!shouldDisableNFTRoutes && (
          <HeaderButton
            data-testid="nft-view-self-nfts"
            onClick={navigateToProfile}
            size={ButtonSize.medium}
            emphasis={ButtonEmphasis.medium}
          >
            <Trans>View and sell NFTs</Trans>
          </HeaderButton>
        )} */}
        {/* <HeaderButton
          size={ButtonSize.medium}
          emphasis={ButtonEmphasis.medium}
          onClick={handleBuyCryptoClick}
          disabled={disableBuyCryptoButton}
          data-testid="wallet-buy-crypto"
        >
          {error ? (
            <ThemedText.BodyPrimary>{error}</ThemedText.BodyPrimary>
          ) : (
            <>
              {fiatOnrampAvailabilityLoading ? (
                <StyledLoadingButtonSpinner />
              ) : (
                <CreditCard height="20px" width="20px" />
              )}{' '}
              <Trans>Buy crypto</Trans>
            </>
          )}
        </HeaderButton> */}
        {/* {Boolean(!fiatOnrampAvailable && fiatOnrampAvailabilityChecked) && (
          <FiatOnrampNotAvailableText marginTop="8px">
            <Trans>Not available in your region</Trans>
            <Tooltip
              show={showFiatOnrampUnavailableTooltip}
              text={<Trans>Moonpay is not available in some regions. Click to learn more.</Trans>}
            >
              <FiatOnrampAvailabilityExternalLink
                onMouseEnter={openFiatOnrampUnavailableTooltip}
                onMouseLeave={closeFiatOnrampUnavailableTooltip}
                style={{ color: 'inherit' }}
                href="https://support.uniswap.org/hc/en-us/articles/11306664890381-Why-isn-t-MoonPay-available-in-my-region-"
              >
                <StyledInfoIcon />
              </FiatOnrampAvailabilityExternalLink>
            </Tooltip>
          </FiatOnrampNotAvailableText>
        )} */}
        <MiniPortfolio account={account} />
        {/* {isUnclaimed && (
          <UNIButton onClick={openClaimModal} size={ButtonSize.medium} emphasis={ButtonEmphasis.medium}>
            <Trans>Claim</Trans> {unclaimedAmount?.toFixed(0, { groupSeparator: ',' } ?? '-')} <Trans>reward</Trans>
          </UNIButton>
        )}
        {isClaimAvailable && (
          <UNIButton size={ButtonSize.medium} emphasis={ButtonEmphasis.medium} onClick={openNftModal}>
            <Trans>Claim Uniswap NFT Airdrop</Trans>
          </UNIButton>
        )} */}
      </PortfolioDrawerContainer>
    </AuthenticatedHeaderWrapper>
  )
}
