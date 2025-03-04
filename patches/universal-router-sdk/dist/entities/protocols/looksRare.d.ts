import { Interface } from '@ethersproject/abi'
import { BuyItem, NFTTrade, TokenType } from '../NFTTrade'
import { TradeConfig } from '../Command'
import { RoutePlanner } from '../../utils/routerCommands'
import { BigNumber, BigNumberish } from 'ethers'
export declare type MakerOrder = {
  collection: string
  tokenId: BigNumberish
  isOrderAsk: true
  signer: string
  strategy: string
  currency: string
  amount: BigNumberish
  price: BigNumberish
  minPercentageToAsk: BigNumberish
  nonce: BigNumberish
  startTime: BigNumberish
  endTime: BigNumberish
  v: BigNumberish
  r: string
  s: string
  params: string
}
export declare type TakerOrder = {
  minPercentageToAsk: BigNumberish
  price: BigNumberish
  taker: string
  tokenId: BigNumberish
  isOrderAsk: boolean
  params: string
}
export declare type LooksRareData = {
  makerOrder: MakerOrder
  takerOrder: TakerOrder
  recipient: string
  tokenType: TokenType
}
export declare class LooksRareTrade extends NFTTrade<LooksRareData> {
  static INTERFACE: Interface
  constructor(orders: LooksRareData[])
  encode(planner: RoutePlanner, config: TradeConfig): void
  getBuyItems(): BuyItem[]
  getTotalPrice(): BigNumber
}
