import { MixedRouteTrade, Trade as RouterTrade } from '@uniswap/router-sdk'
import { Trade as V2Trade, Pair } from '@uniswap/v2-sdk'
import { Trade as V3Trade, Pool, FeeAmount } from '@uniswap/v3-sdk'
import { SwapOptions } from '../../src'
import { TradeType, Ether, Token, Currency } from '@uniswap/sdk-core'
export declare const ETHER: Ether
export declare const RECIPIENT = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
export declare const WETH: Token
export declare const DAI: Token
export declare const USDC: Token
export declare const FEE_AMOUNT = FeeAmount.MEDIUM
declare type UniswapPools = {
  WETH_USDC_V2: Pair
  USDC_DAI_V2: Pair
  WETH_USDC_V3: Pool
  WETH_USDC_V3_LOW_FEE: Pool
  USDC_DAI_V3: Pool
}
export declare function getUniswapPools(forkBlock?: number): Promise<UniswapPools>
export declare function getPair(tokenA: Token, tokenB: Token, blockNumber: number): Promise<Pair>
export declare function getPool(tokenA: Token, tokenB: Token, feeAmount: FeeAmount, blockNumber: number): Promise<Pool>
export declare function swapOptions(options: Partial<SwapOptions>): SwapOptions
export declare function buildTrade(
  trades: (
    | V2Trade<Currency, Currency, TradeType>
    | V3Trade<Currency, Currency, TradeType>
    | MixedRouteTrade<Currency, Currency, TradeType>
  )[]
): RouterTrade<Currency, Currency, TradeType>
export {}
