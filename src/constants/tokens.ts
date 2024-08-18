import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import { SupportedChainId } from 'constants/chains'
import invariant from 'tiny-invariant'

// import { UNI_ADDRESS } from './addresses'

export const NATIVE_CHAIN_ID = 'NATIVE'

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
export const DEFAULT_ERC20_DECIMALS = 18

export const USDC_STRATIS = new Token(
  SupportedChainId.STRATIS,
  '0xDD0C4bb4b46A1C10D36593E4FA5F76abdB583f7A',
  6,
  'USDC',
  'USD//C'
)

export const USDT = new Token(
  SupportedChainId.STRATIS,
  '0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C',
  6,
  'USDT',
  'Tether USD'
)

export const UNI: { [chainId: number]: Token } = {}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),

  [SupportedChainId.AURORIA]: new Token(
    SupportedChainId.AURORIA,
    '0x7b7E6F779c497df2e9EAF8C311d44A296E4F316D',
    18,
    'WSTRAX',
    'Wrapped STRAX'
  ),
  [SupportedChainId.STRATIS]: new Token(
    SupportedChainId.STRATIS,
    '0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18',
    18,
    'WSTRAX',
    'Wrapped STRAX'
  ),
}

function isStrax(chainId: number): chainId is SupportedChainId.STRATIS | SupportedChainId.AURORIA {
  return chainId === SupportedChainId.STRATIS || chainId === SupportedChainId.AURORIA
}

class StraxNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isStrax(this.chainId)) throw new Error('Not STRAX')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isStrax(chainId)) throw new Error('Not STRAX')
    super(chainId, 18, 'STRAX', 'Stratis')
  }
}

class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    return WRAPPED_NATIVE_CURRENCY[SupportedChainId.STRATIS] as Token
    // throw new Error(`Unsupported chain ID: ${this.chainId}`)
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId]
  let nativeCurrency: NativeCurrency | Token

  // Use StraxNativeCurrency when chainId is undefined
  if (chainId === undefined) {
    nativeCurrency = new StraxNativeCurrency(SupportedChainId.STRATIS)
  } else if (isStrax(chainId)) {
    nativeCurrency = new StraxNativeCurrency(chainId)
  } else {
    nativeCurrency = ExtendedEther.onChain(chainId)
  }

  return (cachedNativeCurrency[chainId] = nativeCurrency)
}

export const TOKEN_SHORTHANDS: {
  [shorthand: string]: { [chainId in SupportedChainId]?: string }
} = {
  USDC: {
    [SupportedChainId.STRATIS]: USDC_STRATIS.address,
  },
}
