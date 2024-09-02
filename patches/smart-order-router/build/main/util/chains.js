'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.nativeOnChain =
  exports.ExtendedEther =
  exports.WRAPPED_NATIVE_CURRENCY =
  exports.ID_TO_PROVIDER =
  exports.CHAIN_IDS_LIST =
  exports.ID_TO_NETWORK_NAME =
  exports.NATIVE_CURRENCY =
  exports.NATIVE_NAMES_BY_ID =
  exports.NativeCurrencyName =
  exports.ChainName =
  exports.ID_TO_CHAIN_ID =
  exports.NETWORKS_WITH_SAME_UNISWAP_ADDRESSES =
  exports.HAS_L1_FEE =
  exports.V2_SUPPORTED =
  exports.SUPPORTED_CHAINS =
  exports.ChainId =
    void 0;
const sdk_core_1 = require('@uniswap/sdk-core');
var ChainId;
(function (ChainId) {
  ChainId[(ChainId['MAINNET'] = 1)] = 'MAINNET';
  ChainId[(ChainId['AURORIA'] = 205205)] = 'AURORIA';
  ChainId[(ChainId['ROPSTEN'] = 3)] = 'ROPSTEN';
  ChainId[(ChainId['RINKEBY'] = 4)] = 'RINKEBY';
  ChainId[(ChainId['G\u00D6RLI'] = 5)] = 'G\u00D6RLI';
  ChainId[(ChainId['KOVAN'] = 42)] = 'KOVAN';
  ChainId[(ChainId['OPTIMISM'] = 10)] = 'OPTIMISM';
  ChainId[(ChainId['OPTIMISM_GOERLI'] = 420)] = 'OPTIMISM_GOERLI';
  ChainId[(ChainId['OPTIMISTIC_KOVAN'] = 69)] = 'OPTIMISTIC_KOVAN';
  ChainId[(ChainId['ARBITRUM_ONE'] = 42161)] = 'ARBITRUM_ONE';
  ChainId[(ChainId['ARBITRUM_RINKEBY'] = 421611)] = 'ARBITRUM_RINKEBY';
  ChainId[(ChainId['ARBITRUM_GOERLI'] = 421613)] = 'ARBITRUM_GOERLI';
  ChainId[(ChainId['POLYGON'] = 137)] = 'POLYGON';
  ChainId[(ChainId['POLYGON_MUMBAI'] = 80001)] = 'POLYGON_MUMBAI';
  ChainId[(ChainId['CELO'] = 42220)] = 'CELO';
  ChainId[(ChainId['CELO_ALFAJORES'] = 44787)] = 'CELO_ALFAJORES';
  ChainId[(ChainId['GNOSIS'] = 100)] = 'GNOSIS';
  ChainId[(ChainId['MOONBEAM'] = 1284)] = 'MOONBEAM';
  ChainId[(ChainId['BSC'] = 56)] = 'BSC';
})((ChainId = exports.ChainId || (exports.ChainId = {})));
// WIP: Gnosis, Moonbeam
exports.SUPPORTED_CHAINS = [
  ChainId.MAINNET,
  ChainId.AURORIA,
  ChainId.RINKEBY,
  ChainId.ROPSTEN,
  ChainId.KOVAN,
  ChainId.OPTIMISM,
  ChainId.OPTIMISM_GOERLI,
  ChainId.OPTIMISTIC_KOVAN,
  ChainId.ARBITRUM_ONE,
  ChainId.ARBITRUM_RINKEBY,
  ChainId.ARBITRUM_GOERLI,
  ChainId.POLYGON,
  ChainId.POLYGON_MUMBAI,
  ChainId.GÖRLI,
  ChainId.CELO_ALFAJORES,
  ChainId.CELO,
  ChainId.BSC,
  // Gnosis and Moonbeam don't yet have contracts deployed yet
];
exports.V2_SUPPORTED = [
  ChainId.MAINNET,
  ChainId.KOVAN,
  ChainId.GÖRLI,
  ChainId.RINKEBY,
  ChainId.ROPSTEN,
];
exports.HAS_L1_FEE = [
  ChainId.OPTIMISM,
  ChainId.OPTIMISM_GOERLI,
  ChainId.OPTIMISTIC_KOVAN,
  ChainId.ARBITRUM_ONE,
  ChainId.ARBITRUM_RINKEBY,
  ChainId.ARBITRUM_GOERLI,
];
exports.NETWORKS_WITH_SAME_UNISWAP_ADDRESSES = [
  ChainId.MAINNET,
  ChainId.ROPSTEN,
  ChainId.RINKEBY,
  ChainId.GÖRLI,
  ChainId.KOVAN,
  ChainId.OPTIMISM,
  ChainId.OPTIMISTIC_KOVAN,
  ChainId.ARBITRUM_ONE,
  ChainId.ARBITRUM_RINKEBY,
  ChainId.POLYGON,
  ChainId.POLYGON_MUMBAI,
];
const ID_TO_CHAIN_ID = (id) => {
  switch (id) {
    case 1:
      return ChainId.MAINNET;
    case 205205:
      return ChainId.AURORIA;
    case 3:
      return ChainId.ROPSTEN;
    case 4:
      return ChainId.RINKEBY;
    case 5:
      return ChainId.GÖRLI;
    case 42:
      return ChainId.KOVAN;
    case 56:
      return ChainId.BSC;
    case 10:
      return ChainId.OPTIMISM;
    case 420:
      return ChainId.OPTIMISM_GOERLI;
    case 69:
      return ChainId.OPTIMISTIC_KOVAN;
    case 42161:
      return ChainId.ARBITRUM_ONE;
    case 421611:
      return ChainId.ARBITRUM_RINKEBY;
    case 421613:
      return ChainId.ARBITRUM_GOERLI;
    case 137:
      return ChainId.POLYGON;
    case 80001:
      return ChainId.POLYGON_MUMBAI;
    case 42220:
      return ChainId.CELO;
    case 44787:
      return ChainId.CELO_ALFAJORES;
    case 100:
      return ChainId.GNOSIS;
    case 1284:
      return ChainId.MOONBEAM;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};
exports.ID_TO_CHAIN_ID = ID_TO_CHAIN_ID;
var ChainName;
(function (ChainName) {
  ChainName['MAINNET'] = 'mainnet';
  ChainName['AURORIA'] = 'auroria';
  ChainName['ROPSTEN'] = 'ropsten';
  ChainName['RINKEBY'] = 'rinkeby';
  ChainName['G\u00D6RLI'] = 'goerli';
  ChainName['KOVAN'] = 'kovan';
  ChainName['OPTIMISM'] = 'optimism-mainnet';
  ChainName['OPTIMISM_GOERLI'] = 'optimism-goerli';
  ChainName['OPTIMISTIC_KOVAN'] = 'optimism-kovan';
  ChainName['ARBITRUM_ONE'] = 'arbitrum-mainnet';
  ChainName['ARBITRUM_RINKEBY'] = 'arbitrum-rinkeby';
  ChainName['ARBITRUM_GOERLI'] = 'arbitrum-goerli';
  ChainName['POLYGON'] = 'polygon-mainnet';
  ChainName['POLYGON_MUMBAI'] = 'polygon-mumbai';
  ChainName['CELO'] = 'celo-mainnet';
  ChainName['CELO_ALFAJORES'] = 'celo-alfajores';
  ChainName['GNOSIS'] = 'gnosis-mainnet';
  ChainName['MOONBEAM'] = 'moonbeam-mainnet';
  ChainName['BSC'] = 'bsc-mainnet';
})((ChainName = exports.ChainName || (exports.ChainName = {})));
var NativeCurrencyName;
(function (NativeCurrencyName) {
  // Strings match input for CLI
  NativeCurrencyName['ETHER'] = 'ETH';
  NativeCurrencyName['MATIC'] = 'MATIC';
  NativeCurrencyName['CELO'] = 'CELO';
  NativeCurrencyName['GNOSIS'] = 'XDAI';
  NativeCurrencyName['MOONBEAM'] = 'GLMR';
  NativeCurrencyName['BNB'] = 'BNB';
  NativeCurrencyName['AURORIA'] = 'tSTRAX';
})(
  (NativeCurrencyName =
    exports.NativeCurrencyName || (exports.NativeCurrencyName = {}))
);
exports.NATIVE_NAMES_BY_ID = {
  [ChainId.MAINNET]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.AURORIA]: [
    'tSTRAX',
    'tSTRAX',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.RINKEBY]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.GÖRLI]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.KOVAN]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.ROPSTEN]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.OPTIMISM]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.OPTIMISM_GOERLI]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.OPTIMISTIC_KOVAN]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.ARBITRUM_ONE]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.ARBITRUM_RINKEBY]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.ARBITRUM_GOERLI]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.POLYGON]: ['MATIC', '0x0000000000000000000000000000000000001010'],
  [ChainId.POLYGON_MUMBAI]: [
    'MATIC',
    '0x0000000000000000000000000000000000001010',
  ],
  [ChainId.CELO]: ['CELO'],
  [ChainId.CELO_ALFAJORES]: ['CELO'],
  [ChainId.GNOSIS]: ['XDAI'],
  [ChainId.MOONBEAM]: ['GLMR'],
  [ChainId.BSC]: ['BNB', 'BNB', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
};
exports.NATIVE_CURRENCY = {
  [ChainId.MAINNET]: NativeCurrencyName.ETHER,
  [ChainId.AURORIA]: NativeCurrencyName.AURORIA,
  [ChainId.ROPSTEN]: NativeCurrencyName.ETHER,
  [ChainId.RINKEBY]: NativeCurrencyName.ETHER,
  [ChainId.GÖRLI]: NativeCurrencyName.ETHER,
  [ChainId.KOVAN]: NativeCurrencyName.ETHER,
  [ChainId.OPTIMISM]: NativeCurrencyName.ETHER,
  [ChainId.OPTIMISM_GOERLI]: NativeCurrencyName.ETHER,
  [ChainId.OPTIMISTIC_KOVAN]: NativeCurrencyName.ETHER,
  [ChainId.ARBITRUM_ONE]: NativeCurrencyName.ETHER,
  [ChainId.ARBITRUM_RINKEBY]: NativeCurrencyName.ETHER,
  [ChainId.ARBITRUM_GOERLI]: NativeCurrencyName.ETHER,
  [ChainId.POLYGON]: NativeCurrencyName.MATIC,
  [ChainId.POLYGON_MUMBAI]: NativeCurrencyName.MATIC,
  [ChainId.CELO]: NativeCurrencyName.CELO,
  [ChainId.CELO_ALFAJORES]: NativeCurrencyName.CELO,
  [ChainId.GNOSIS]: NativeCurrencyName.GNOSIS,
  [ChainId.MOONBEAM]: NativeCurrencyName.MOONBEAM,
  [ChainId.BSC]: NativeCurrencyName.BNB,
};
const ID_TO_NETWORK_NAME = (id) => {
  switch (id) {
    case 1:
      return ChainName.MAINNET;
    case 205205:
      return ChainName.AURORIA;
    case 3:
      return ChainName.ROPSTEN;
    case 4:
      return ChainName.RINKEBY;
    case 5:
      return ChainName.GÖRLI;
    case 42:
      return ChainName.KOVAN;
    case 56:
      return ChainName.BSC;
    case 10:
      return ChainName.OPTIMISM;
    case 420:
      return ChainName.OPTIMISM_GOERLI;
    case 69:
      return ChainName.OPTIMISTIC_KOVAN;
    case 42161:
      return ChainName.ARBITRUM_ONE;
    case 421611:
      return ChainName.ARBITRUM_RINKEBY;
    case 421613:
      return ChainName.ARBITRUM_GOERLI;
    case 137:
      return ChainName.POLYGON;
    case 80001:
      return ChainName.POLYGON_MUMBAI;
    case 42220:
      return ChainName.CELO;
    case 44787:
      return ChainName.CELO_ALFAJORES;
    case 100:
      return ChainName.GNOSIS;
    case 1284:
      return ChainName.MOONBEAM;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};
exports.ID_TO_NETWORK_NAME = ID_TO_NETWORK_NAME;
exports.CHAIN_IDS_LIST = Object.values(ChainId).map((c) => c.toString());
const ID_TO_PROVIDER = (id) => {
  switch (id) {
    case ChainId.MAINNET:
      return process.env.JSON_RPC_PROVIDER;
    case ChainId.AURORIA:
      return process.env.JSON_RPC_PROVIDER_AURORIA;
    case ChainId.ROPSTEN:
      return process.env.JSON_RPC_PROVIDER_ROPSTEN;
    case ChainId.RINKEBY:
      return process.env.JSON_RPC_PROVIDER_RINKEBY;
    case ChainId.GÖRLI:
      return process.env.JSON_RPC_PROVIDER_GORLI;
    case ChainId.KOVAN:
      return process.env.JSON_RPC_PROVIDER_KOVAN;
    case ChainId.OPTIMISM:
      return process.env.JSON_RPC_PROVIDER_OPTIMISM;
    case ChainId.OPTIMISM_GOERLI:
      return process.env.JSON_RPC_PROVIDER_OPTIMISM_GOERLI;
    case ChainId.OPTIMISTIC_KOVAN:
      return process.env.JSON_RPC_PROVIDER_OPTIMISTIC_KOVAN;
    case ChainId.ARBITRUM_ONE:
      return process.env.JSON_RPC_PROVIDER_ARBITRUM_ONE;
    case ChainId.ARBITRUM_RINKEBY:
      return process.env.JSON_RPC_PROVIDER_ARBITRUM_RINKEBY;
    case ChainId.ARBITRUM_GOERLI:
      return process.env.JSON_RPC_PROVIDER_ARBITRUM_GOERLI;
    case ChainId.POLYGON:
      return process.env.JSON_RPC_PROVIDER_POLYGON;
    case ChainId.POLYGON_MUMBAI:
      return process.env.JSON_RPC_PROVIDER_POLYGON_MUMBAI;
    case ChainId.CELO:
      return process.env.JSON_RPC_PROVIDER_CELO;
    case ChainId.CELO_ALFAJORES:
      return process.env.JSON_RPC_PROVIDER_CELO_ALFAJORES;
    case ChainId.BSC:
      return process.env.JSON_RPC_PROVIDER_BSC;
    default:
      throw new Error(`Chain id: ${id} not supported`);
  }
};
exports.ID_TO_PROVIDER = ID_TO_PROVIDER;
exports.WRAPPED_NATIVE_CURRENCY = {
  [ChainId.MAINNET]: new sdk_core_1.Token(
    1,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.AURORIA]: new sdk_core_1.Token(
    205205,
    '0x7b7E6F779c497df2e9EAF8C311d44A296E4F316D',
    18,
    'WSTRAX',
    'Wrapped STRAX'
  ),
  [ChainId.ROPSTEN]: new sdk_core_1.Token(
    3,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new sdk_core_1.Token(
    4,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new sdk_core_1.Token(
    5,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.KOVAN]: new sdk_core_1.Token(
    42,
    '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BSC]: new sdk_core_1.Token(
    56,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.OPTIMISM]: new sdk_core_1.Token(
    ChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.OPTIMISM_GOERLI]: new sdk_core_1.Token(
    ChainId.OPTIMISM_GOERLI,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.OPTIMISTIC_KOVAN]: new sdk_core_1.Token(
    ChainId.OPTIMISTIC_KOVAN,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_ONE]: new sdk_core_1.Token(
    ChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_RINKEBY]: new sdk_core_1.Token(
    ChainId.ARBITRUM_RINKEBY,
    '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_GOERLI]: new sdk_core_1.Token(
    ChainId.ARBITRUM_GOERLI,
    '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.POLYGON]: new sdk_core_1.Token(
    ChainId.POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [ChainId.POLYGON_MUMBAI]: new sdk_core_1.Token(
    ChainId.POLYGON_MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  // The Celo native currency 'CELO' implements the erc-20 token standard
  [ChainId.CELO]: new sdk_core_1.Token(
    ChainId.CELO,
    '0x471EcE3750Da237f93B8E339c536989b8978a438',
    18,
    'CELO',
    'Celo native asset'
  ),
  [ChainId.CELO_ALFAJORES]: new sdk_core_1.Token(
    ChainId.CELO_ALFAJORES,
    '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
    18,
    'CELO',
    'Celo native asset'
  ),
  [ChainId.GNOSIS]: new sdk_core_1.Token(
    ChainId.GNOSIS,
    '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
    18,
    'WXDAI',
    'Wrapped XDAI on Gnosis'
  ),
  [ChainId.MOONBEAM]: new sdk_core_1.Token(
    ChainId.MOONBEAM,
    '0xAcc15dC74880C9944775448304B263D191c6077F',
    18,
    'WGLMR',
    'Wrapped GLMR'
  ),
};
function isMatic(chainId) {
  return chainId === ChainId.POLYGON_MUMBAI || chainId === ChainId.POLYGON;
}
class MaticNativeCurrency extends sdk_core_1.NativeCurrency {
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
  get wrapped() {
    if (!isMatic(this.chainId)) throw new Error('Not matic');
    const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }
  constructor(chainId) {
    if (!isMatic(chainId)) throw new Error('Not matic');
    super(chainId, 18, 'MATIC', 'Polygon Matic');
  }
}
function isCelo(chainId) {
  return chainId === ChainId.CELO_ALFAJORES || chainId === ChainId.CELO;
}
class CeloNativeCurrency extends sdk_core_1.NativeCurrency {
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
  get wrapped() {
    if (!isCelo(this.chainId)) throw new Error('Not celo');
    const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }
  constructor(chainId) {
    if (!isCelo(chainId)) throw new Error('Not celo');
    super(chainId, 18, 'CELO', 'Celo');
  }
}
function isGnosis(chainId) {
  return chainId === ChainId.GNOSIS;
}
class GnosisNativeCurrency extends sdk_core_1.NativeCurrency {
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
  get wrapped() {
    if (!isGnosis(this.chainId)) throw new Error('Not gnosis');
    const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }
  constructor(chainId) {
    if (!isGnosis(chainId)) throw new Error('Not gnosis');
    super(chainId, 18, 'XDAI', 'xDai');
  }
}
function isBsc(chainId) {
  return chainId === ChainId.BSC;
}
class BscNativeCurrency extends sdk_core_1.NativeCurrency {
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
  get wrapped() {
    if (!isBsc(this.chainId)) throw new Error('Not bnb');
    const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }
  constructor(chainId) {
    if (!isBsc(chainId)) throw new Error('Not bnb');
    super(chainId, 18, 'BNB', 'BNB');
  }
}
function isMoonbeam(chainId) {
  return chainId === ChainId.MOONBEAM;
}
class MoonbeamNativeCurrency extends sdk_core_1.NativeCurrency {
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
  get wrapped() {
    if (!isMoonbeam(this.chainId)) throw new Error('Not moonbeam');
    const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }
  constructor(chainId) {
    if (!isMoonbeam(chainId)) throw new Error('Not moonbeam');
    super(chainId, 18, 'GLMR', 'Glimmer');
  }
}
class ExtendedEther extends sdk_core_1.Ether {
  get wrapped() {
    if (this.chainId in exports.WRAPPED_NATIVE_CURRENCY)
      return exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
    throw new Error('Unsupported chain ID');
  }
  static onChain(chainId) {
    var _a;
    return (_a = this._cachedExtendedEther[chainId]) !== null && _a !== void 0
      ? _a
      : (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId));
  }
}
exports.ExtendedEther = ExtendedEther;
ExtendedEther._cachedExtendedEther = {};
const cachedNativeCurrency = {};
function nativeOnChain(chainId) {
  if (cachedNativeCurrency[chainId] != undefined)
    return cachedNativeCurrency[chainId];
  if (isMatic(chainId))
    cachedNativeCurrency[chainId] = new MaticNativeCurrency(chainId);
  else if (isCelo(chainId))
    cachedNativeCurrency[chainId] = new CeloNativeCurrency(chainId);
  else if (isGnosis(chainId))
    cachedNativeCurrency[chainId] = new GnosisNativeCurrency(chainId);
  else if (isMoonbeam(chainId))
    cachedNativeCurrency[chainId] = new MoonbeamNativeCurrency(chainId);
  else if (isBsc(chainId))
    cachedNativeCurrency[chainId] = new BscNativeCurrency(chainId);
  else cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId);
  return cachedNativeCurrency[chainId];
}
exports.nativeOnChain = nativeOnChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvY2hhaW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUEyRTtBQUczRSxJQUFZLE9BbUJYO0FBbkJELFdBQVksT0FBTztJQUNqQiwyQ0FBVyxDQUFBO0lBQ1gsMkNBQVcsQ0FBQTtJQUNYLDJDQUFXLENBQUE7SUFDWCxpREFBUyxDQUFBO0lBQ1Qsd0NBQVUsQ0FBQTtJQUNWLDhDQUFhLENBQUE7SUFDYiw2REFBcUIsQ0FBQTtJQUNyQiw4REFBcUIsQ0FBQTtJQUNyQix5REFBb0IsQ0FBQTtJQUNwQixrRUFBeUIsQ0FBQTtJQUN6QixnRUFBd0IsQ0FBQTtJQUN4Qiw2Q0FBYSxDQUFBO0lBQ2IsNkRBQXNCLENBQUE7SUFDdEIseUNBQVksQ0FBQTtJQUNaLDZEQUFzQixDQUFBO0lBQ3RCLDJDQUFZLENBQUE7SUFDWixnREFBZSxDQUFBO0lBQ2Ysb0NBQVEsQ0FBQTtBQUNWLENBQUMsRUFuQlcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBbUJsQjtBQUVELHdCQUF3QjtBQUNYLFFBQUEsZ0JBQWdCLEdBQWM7SUFDekMsT0FBTyxDQUFDLE9BQU87SUFDZixPQUFPLENBQUMsT0FBTztJQUNmLE9BQU8sQ0FBQyxPQUFPO0lBQ2YsT0FBTyxDQUFDLEtBQUs7SUFDYixPQUFPLENBQUMsUUFBUTtJQUNoQixPQUFPLENBQUMsZUFBZTtJQUN2QixPQUFPLENBQUMsZ0JBQWdCO0lBQ3hCLE9BQU8sQ0FBQyxZQUFZO0lBQ3BCLE9BQU8sQ0FBQyxnQkFBZ0I7SUFDeEIsT0FBTyxDQUFDLGVBQWU7SUFDdkIsT0FBTyxDQUFDLE9BQU87SUFDZixPQUFPLENBQUMsY0FBYztJQUN0QixPQUFPLENBQUMsS0FBSztJQUNiLE9BQU8sQ0FBQyxjQUFjO0lBQ3RCLE9BQU8sQ0FBQyxJQUFJO0lBQ1osT0FBTyxDQUFDLEdBQUc7SUFDWCw0REFBNEQ7Q0FDN0QsQ0FB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
