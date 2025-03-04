import { BigNumber, BigNumberish } from 'ethers'
import { SeaportData } from './protocols/seaport'
import { FoundationData } from './protocols/foundation'
import { NFTXData } from './protocols/nftx'
import { NFT20Data } from './protocols/nft20'
import { RoutePlanner } from '../utils/routerCommands'
import { Command, RouterTradeType, TradeConfig } from './Command'
import { LooksRareData } from './protocols/looksRare'
import { SudoswapData } from './protocols/sudoswap'
import { CryptopunkData } from './protocols/cryptopunk'
import { X2Y2Data } from './protocols/x2y2'
export declare type SupportedProtocolsData =
  | SeaportData
  | FoundationData
  | NFTXData
  | LooksRareData
  | X2Y2Data
  | CryptopunkData
  | NFT20Data
  | SudoswapData
export declare abstract class NFTTrade<T> implements Command {
  readonly tradeType: RouterTradeType
  readonly orders: T[]
  readonly market: Market
  constructor(market: Market, orders: T[])
  abstract encode(planner: RoutePlanner, config: TradeConfig): void
  abstract getBuyItems(): BuyItem[]
  abstract getTotalPrice(): BigNumber
}
export declare type BuyItem = {
  tokenAddress: string
  tokenId: BigNumberish
  tokenType: TokenType
  amount?: BigNumberish
}
export declare enum Market {
  Foundation = 'foundation',
  LooksRare = 'looksrare',
  NFT20 = 'nft20',
  NFTX = 'nftx',
  Seaport = 'seaport',
  Sudoswap = 'Sudoswap',
  Cryptopunks = 'cryptopunks',
  X2Y2 = 'x2y2',
}
export declare enum TokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  Cryptopunk = 'Cryptopunk',
}
