import { BigNumber } from '@ethersproject/bignumber';
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk/dist/entities';
import { Pool } from '@uniswap/v3-sdk';
import { IV2PoolProvider } from '../providers';
import {
  ArbitrumGasData,
  OptimismGasData,
} from '../providers/v3/gas-data-provider';
import { IV3PoolProvider } from '../providers/v3/pool-provider';
import { SwapRoute } from '../routers';
import { ChainId } from '../util';
export declare function getV2NativePool(
  token: Token,
  poolProvider: IV2PoolProvider
): Promise<Pair | null>;
export declare function getHighestLiquidityV3NativePool(
  token: Token,
  poolProvider: IV3PoolProvider
): Promise<Pool | null>;
export declare function getHighestLiquidityV3USDPool(
  chainId: ChainId,
  poolProvider: IV3PoolProvider
): Promise<Pool>;
export declare function getGasCostInUSD(
  usdPool: Pool,
  costNativeCurrency: CurrencyAmount<Token>
): CurrencyAmount<Token>;
export declare function getGasCostInNativeCurrency(
  nativeCurrency: Token,
  gasCostInWei: BigNumber
): CurrencyAmount<Token>;
export declare function getGasCostInQuoteToken(
  quoteToken: Token,
  nativePool: Pool | Pair,
  costNativeCurrency: CurrencyAmount<Token>
): Promise<CurrencyAmount<Token>>;
export declare function calculateArbitrumToL1FeeFromCalldata(
  calldata: string,
  gasData: ArbitrumGasData
): [BigNumber, BigNumber];
export declare function calculateOptimismToL1FeeFromCalldata(
  calldata: string,
  gasData: OptimismGasData
): [BigNumber, BigNumber];
export declare function getL2ToL1GasUsed(
  data: string,
  overhead: BigNumber
): BigNumber;
export declare function calculateGasUsed(
  chainId: ChainId,
  route: SwapRoute,
  simulatedGasUsed: BigNumber,
  v2PoolProvider: IV2PoolProvider,
  v3PoolProvider: IV3PoolProvider,
  l2GasData?: ArbitrumGasData | OptimismGasData
): Promise<{
  estimatedGasUsedUSD: CurrencyAmount<Token>;
  estimatedGasUsedQuoteToken: CurrencyAmount<Token>;
  quoteGasAdjusted: CurrencyAmount<Currency>;
}>;
export declare function initSwapRouteFromExisting(
  swapRoute: SwapRoute,
  v2PoolProvider: IV2PoolProvider,
  v3PoolProvider: IV3PoolProvider,
  quoteGasAdjusted: CurrencyAmount<Currency>,
  estimatedGasUsed: BigNumber,
  estimatedGasUsedQuoteToken: CurrencyAmount<Currency>,
  estimatedGasUsedUSD: CurrencyAmount<Currency>
): SwapRoute;
