'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CachingTokenProviderWithFallback = exports.CACHE_SEED_TOKENS = void 0;
const sdk_core_1 = require('@uniswap/sdk-core');
const lodash_1 = __importDefault(require('lodash'));
const util_1 = require('../util');
const token_provider_1 = require('./token-provider');
// These tokens will added to the Token cache on initialization.
exports.CACHE_SEED_TOKENS = {
  [util_1.ChainId.MAINNET]: {
    WETH: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.MAINNET],
    USDC: token_provider_1.USDC_MAINNET,
    USDT: token_provider_1.USDT_MAINNET,
    WBTC: token_provider_1.WBTC_MAINNET,
    DAI: token_provider_1.DAI_MAINNET,
    // This token stores its symbol as bytes32, therefore can not be fetched on-chain using
    // our token providers.
    // This workaround adds it to the cache, so we won't try to fetch it on-chain.
    RING: new sdk_core_1.Token(
      util_1.ChainId.MAINNET,
      '0x9469D013805bFfB7D3DEBe5E7839237e535ec483',
      18,
      'RING',
      'RING'
    ),
  },
  [util_1.ChainId.RINKEBY]: {
    WETH: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.RINKEBY],
    DAI_1: token_provider_1.DAI_RINKEBY_1,
    DAI_2: token_provider_1.DAI_RINKEBY_2,
  },
  [util_1.ChainId.OPTIMISM]: {
    USDC: token_provider_1.USDC_OPTIMISM,
    USDT: token_provider_1.USDT_OPTIMISM,
    WBTC: token_provider_1.WBTC_OPTIMISM,
    DAI: token_provider_1.DAI_OPTIMISM,
  },
  [util_1.ChainId.OPTIMISM_GOERLI]: {
    USDC: token_provider_1.USDC_OPTIMISM_GOERLI,
    USDT: token_provider_1.USDT_OPTIMISM_GOERLI,
    WBTC: token_provider_1.WBTC_OPTIMISM_GOERLI,
    DAI: token_provider_1.DAI_OPTIMISM_GOERLI,
  },
  [util_1.ChainId.OPTIMISTIC_KOVAN]: {
    USDC: token_provider_1.USDC_OPTIMISTIC_KOVAN,
    USDT: token_provider_1.USDT_OPTIMISTIC_KOVAN,
    WBTC: token_provider_1.WBTC_OPTIMISTIC_KOVAN,
    DAI: token_provider_1.DAI_OPTIMISTIC_KOVAN,
  },
  [util_1.ChainId.ARBITRUM_ONE]: {
    USDC: token_provider_1.USDC_ARBITRUM,
    USDT: token_provider_1.USDT_ARBITRUM,
    WBTC: token_provider_1.WBTC_ARBITRUM,
    DAI: token_provider_1.DAI_ARBITRUM,
  },
  [util_1.ChainId.ARBITRUM_RINKEBY]: {
    USDT: token_provider_1.USDT_ARBITRUM_RINKEBY,
    UNI: token_provider_1.UNI_ARBITRUM_RINKEBY,
    DAI: token_provider_1.DAI_ARBITRUM_RINKEBY,
    USDC: token_provider_1.USDC_ARBITRUM_RINKEBY,
  },
  [util_1.ChainId.ARBITRUM_GOERLI]: {
    USDC: token_provider_1.USDC_ARBITRUM_GOERLI,
  },
  [util_1.ChainId.POLYGON]: {
    WMATIC: token_provider_1.WMATIC_POLYGON,
    USDC: token_provider_1.USDC_POLYGON,
  },
  [util_1.ChainId.POLYGON_MUMBAI]: {
    WMATIC: token_provider_1.WMATIC_POLYGON_MUMBAI,
    DAI: token_provider_1.DAI_POLYGON_MUMBAI,
  },
  [util_1.ChainId.CELO]: {
    CELO: token_provider_1.CELO,
    CUSD: token_provider_1.CUSD_CELO,
    CEUR: token_provider_1.CEUR_CELO,
    DAI: token_provider_1.DAI_CELO,
  },
  [util_1.ChainId.CELO_ALFAJORES]: {
    CELO: token_provider_1.CELO_ALFAJORES,
    CUSD: token_provider_1.CUSD_CELO_ALFAJORES,
    CEUR: token_provider_1.CUSD_CELO_ALFAJORES,
    DAI: token_provider_1.DAI_CELO_ALFAJORES,
  },
  [util_1.ChainId.GNOSIS]: {
    WXDAI: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.GNOSIS],
    USDC_ETHEREUM_GNOSIS: token_provider_1.USDC_ETHEREUM_GNOSIS,
  },
  [util_1.ChainId.MOONBEAM]: {
    USDC: token_provider_1.USDC_MOONBEAM,
    DAI: token_provider_1.DAI_MOONBEAM,
    WBTC: token_provider_1.WBTC_MOONBEAM,
    WGLMR: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.MOONBEAM],
  },
  [util_1.ChainId.BSC]: {
    USDC: token_provider_1.USDC_BSC,
    USDT: token_provider_1.USDT_BSC,
    BUSD: token_provider_1.BUSD_BSC,
    ETH: token_provider_1.ETH_BSC,
    DAI: token_provider_1.DAI_BSC,
    BTC: token_provider_1.BTC_BSC,
    WBNB: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.BSC],
  },
  [util_1.ChainId.STRATIS]: {
    WSTRAX: token_provider_1.WSTRAX,
    USDC: token_provider_1.USDC_STRATIS,
    USDT: token_provider_1.USDT,
  },
  // Currently we do not have providers for Moonbeam mainnet or Gnosis testnet
};
/**
 * Provider for getting token metadata that falls back to a different provider
 * in the event of failure.
 *
 * @export
 * @class CachingTokenProviderWithFallback
 */
class CachingTokenProviderWithFallback {
  constructor(
    chainId,
    // Token metadata (e.g. symbol and decimals) don't change so can be cached indefinitely.
    // Constructing a new token object is slow as sdk-core does checksumming.
    tokenCache,
    primaryTokenProvider,
    fallbackTokenProvider
  ) {
    this.chainId = chainId;
    this.tokenCache = tokenCache;
    this.primaryTokenProvider = primaryTokenProvider;
    this.fallbackTokenProvider = fallbackTokenProvider;
    this.CACHE_KEY = (chainId, address) => `token-${chainId}-${address}`;
  }
  async getTokens(_addresses) {
    const seedTokens = exports.CACHE_SEED_TOKENS[this.chainId];
    if (seedTokens) {
      for (const token of Object.values(seedTokens)) {
        await this.tokenCache.set(
          this.CACHE_KEY(this.chainId, token.address.toLowerCase()),
          token
        );
      }
    }
    const addressToToken = {};
    const symbolToToken = {};
    const addresses = (0, lodash_1.default)(_addresses)
      .map((address) => address.toLowerCase())
      .uniq()
      .value();
    const addressesToFindInPrimary = [];
    const addressesToFindInSecondary = [];
    for (const address of addresses) {
      if (await this.tokenCache.has(this.CACHE_KEY(this.chainId, address))) {
        addressToToken[address.toLowerCase()] = await this.tokenCache.get(
          this.CACHE_KEY(this.chainId, address)
        );
        symbolToToken[addressToToken[address].symbol] =
          await this.tokenCache.get(this.CACHE_KEY(this.chainId, address));
      } else {
        addressesToFindInPrimary.push(address);
      }
    }
    util_1.log.info(
      { addressesToFindInPrimary },
      `Found ${addresses.length - addressesToFindInPrimary.length} out of ${
        addresses.length
      } tokens in local cache. ${
        addressesToFindInPrimary.length > 0
          ? `Checking primary token provider for ${addressesToFindInPrimary.length} tokens`
          : ``
      }
      `
    );
    if (addressesToFindInPrimary.length > 0) {
      const primaryTokenAccessor = await this.primaryTokenProvider.getTokens(
        addressesToFindInPrimary
      );
      for (const address of addressesToFindInPrimary) {
        const token = primaryTokenAccessor.getTokenByAddress(address);
        if (token) {
          addressToToken[address.toLowerCase()] = token;
          symbolToToken[addressToToken[address].symbol] = token;
          await this.tokenCache.set(
            this.CACHE_KEY(this.chainId, address.toLowerCase()),
            addressToToken[address]
          );
        } else {
          addressesToFindInSecondary.push(address);
        }
      }
      util_1.log.info(
        { addressesToFindInSecondary },
        `Found ${
          addressesToFindInPrimary.length - addressesToFindInSecondary.length
        } tokens in primary. ${
          this.fallbackTokenProvider
            ? `Checking secondary token provider for ${addressesToFindInSecondary.length} tokens`
            : `No fallback token provider specified. About to return.`
        }`
      );
    }
    if (this.fallbackTokenProvider && addressesToFindInSecondary.length > 0) {
      const secondaryTokenAccessor = await this.fallbackTokenProvider.getTokens(
        addressesToFindInSecondary
      );
      for (const address of addressesToFindInSecondary) {
        const token = secondaryTokenAccessor.getTokenByAddress(address);
        if (token) {
          addressToToken[address.toLowerCase()] = token;
          symbolToToken[addressToToken[address].symbol] = token;
          await this.tokenCache.set(
            this.CACHE_KEY(this.chainId, address.toLowerCase()),
            addressToToken[address]
          );
        }
      }
    }
    return {
      getTokenByAddress: (address) => {
        return addressToToken[address.toLowerCase()];
      },
      getTokenBySymbol: (symbol) => {
        return symbolToToken[symbol.toLowerCase()];
      },
      getAllTokens: () => {
        return Object.values(addressToToken);
      },
    };
  }
}
exports.CachingTokenProviderWithFallback = CachingTokenProviderWithFallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy10b2tlbi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvY2FjaGluZy10b2tlbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBMEM7QUFDMUMsb0RBQXVCO0FBRXZCLGtDQUFnRTtBQUdoRSxxREFtRDBCO0FBRTFCLGdFQUFnRTtBQUNuRCxRQUFBLGlCQUFpQixHQUUxQjtJQUNGLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pCLElBQUksRUFBRSw4QkFBdUIsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFFO1FBQy9DLElBQUksRUFBRSw2QkFBWTtRQUNsQixJQUFJLEVBQUUsNkJBQVk7UUFDbEIsSUFBSSxFQUFFLDZCQUFZO1FBQ2xCLEdBQUcsRUFBRSw0QkFBVztRQUNoQix1RkFBdUY7UUFDdkYsdUJBQXVCO1FBQ3ZCLDhFQUE4RTtRQUM5RSxJQUFJLEVBQUUsSUFBSSxnQkFBSyxDQUNiLGNBQU8sQ0FBQyxPQUFPLEVBQ2YsNENBQTRDLEVBQzVDLEVBQUUsRUFDRixNQUFNLEVBQ04sTUFBTSxDQUNQO0tBQ0Y7SUFDRCxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUsOEJBQXVCLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBRTtRQUMvQyxLQUFLLEVBQUUsOEJBQWE7UUFDcEIsS0FBSyxFQUFFLDhCQUFhO0tBQ3JCO0lBQ0QsQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbEIsSUFBSSxFQUFFLDhCQUFhO1FBQ25CLElBQUksRUFBRSw4QkFBYTtRQUNuQixJQUFJLEVBQUUsOEJBQWE7UUFDbkIsR0FBRyxFQUFFLDZCQUFZO0tBQ2xCO0lBQ0QsQ0FBQyxjQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDekIsSUFBSSxFQUFFLHFDQUFvQjtRQUMxQixJQUFJLEVBQUUscUNBQW9CO1FB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
