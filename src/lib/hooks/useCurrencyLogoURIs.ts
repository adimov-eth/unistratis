import { SupportedChainId } from 'constants/chains'
import useHttpLocations from 'hooks/useHttpLocations'
import { useMemo } from 'react'
import { isAddress } from 'utils'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
// import BnbLogo from '../../assets/svg/bnb-logo.svg'
// import CeloLogo from '../../assets/svg/celo_logo.svg'
// import MaticLogo from '../../assets/svg/matic-token-icon.svg'
import {
  // isCelo,
  NATIVE_CHAIN_ID,
} from '../../constants/tokens'

type Network = 'ethereum' | 'arbitrum' | 'optimism' | 'polygon' | 'smartchain' | 'stratis'

export function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.STRATIS:
      return 'stratis'
    // case SupportedChainId.ARBITRUM_ONE:
    //   return 'arbitrum'
    // case SupportedChainId.OPTIMISM:
    //   return 'optimism'
    // case SupportedChainId.POLYGON:
    //   return 'polygon'
    case SupportedChainId.AURORIA:
      return 'stratis'
    default:
      return 'ethereum'
  }
}

export function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.STRATIS): string {
  switch (chainId) {
    case 205205:
      return EthereumLogo
    case 105105:
      return EthereumLogo
    default:
      return EthereumLogo
  }
}
//TODO: Check logos
// function getTokenLogoURI(address: string, chainId: SupportedChainId = SupportedChainId.STRATIS): string | void {
// const networkName = chainIdToNetworkName(chainId)
// const networksWithUrls = [
//   SupportedChainId.ARBITRUM_ONE,
//   SupportedChainId.MAINNET,
//   SupportedChainId.OPTIMISM,
//   SupportedChainId.BNB,
// ]
// if (networksWithUrls.includes(chainId)) {
//   return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
// }
// // Celo logo logo is hosted elsewhere.
// if (isCelo(chainId)) {
//   if (address === nativeOnChain(chainId).wrapped.address) {
//     return 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png'
//   }
// }
// }

export default function useCurrencyLogoURIs(
  currency:
    | {
        isNative?: boolean
        isToken?: boolean
        address?: string
        chainId: number
        logoURI?: string | null
      }
    | null
    | undefined
): string[] {
  const locations = useHttpLocations(currency?.logoURI)
  return useMemo(() => {
    const logoURIs = [...locations]
    if (currency) {
      if (currency.isNative || currency.address === NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId))
      } else if (currency.isToken || currency.address) {
        const checksummedAddress = isAddress(currency.address)
        const logoURI = checksummedAddress
        if (logoURI) {
          logoURIs.push(logoURI)
        }
      }
    }
    return logoURIs
  }, [currency, locations])
}
