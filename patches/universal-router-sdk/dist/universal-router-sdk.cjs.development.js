'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var invariant = _interopDefault(require('tiny-invariant'))
var UniversalRouter_json = require('@uniswap/universal-router/artifacts/contracts/UniversalRouter.sol/UniversalRouter.json')
var abi$7 = require('@ethersproject/abi')
var ethers = require('ethers')
var JSBI = _interopDefault(require('jsbi'))
var utils = require('ethers/lib/utils')
var v2Sdk = require('@uniswap/v2-sdk')
var v3Sdk = require('@uniswap/v3-sdk')
var routerSdk = require('@uniswap/router-sdk')
var sdkCore = require('@uniswap/sdk-core')

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass
  _setPrototypeOf(subClass, superClass)
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p
        return o
      }
  return _setPrototypeOf(o, p)
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
  return arr2
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator']
  if (it) return (it = it.call(o)).next.bind(it)
  if (
    Array.isArray(o) ||
    (it = _unsupportedIterableToArray(o)) ||
    (allowArrayLike && o && typeof o.length === 'number')
  ) {
    if (it) o = it
    var i = 0
    return function () {
      if (i >= o.length)
        return {
          done: true,
        }
      return {
        done: false,
        value: o[i++],
      }
    }
  }
  throw new TypeError(
    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

;(function (RouterTradeType) {
  RouterTradeType['UniswapTrade'] = 'UniswapTrade'
  RouterTradeType['NFTTrade'] = 'NFTTrade'
  RouterTradeType['UnwrapWETH'] = 'UnwrapWETH'
})(exports.RouterTradeType || (exports.RouterTradeType = {}))

var _ABI_DEFINITION
/**
 * CommandTypes
 * @description Flags that modify a command's execution
 * @enum {number}
 */
var CommandType
;(function (CommandType) {
  CommandType[(CommandType['V3_SWAP_EXACT_IN'] = 0)] = 'V3_SWAP_EXACT_IN'
  CommandType[(CommandType['V3_SWAP_EXACT_OUT'] = 1)] = 'V3_SWAP_EXACT_OUT'
  CommandType[(CommandType['PERMIT2_TRANSFER_FROM'] = 2)] = 'PERMIT2_TRANSFER_FROM'
  CommandType[(CommandType['PERMIT2_PERMIT_BATCH'] = 3)] = 'PERMIT2_PERMIT_BATCH'
  CommandType[(CommandType['SWEEP'] = 4)] = 'SWEEP'
  CommandType[(CommandType['TRANSFER'] = 5)] = 'TRANSFER'
  CommandType[(CommandType['PAY_PORTION'] = 6)] = 'PAY_PORTION'
  CommandType[(CommandType['V2_SWAP_EXACT_IN'] = 8)] = 'V2_SWAP_EXACT_IN'
  CommandType[(CommandType['V2_SWAP_EXACT_OUT'] = 9)] = 'V2_SWAP_EXACT_OUT'
  CommandType[(CommandType['PERMIT'] = 10)] = 'PERMIT'
  CommandType[(CommandType['WRAP_ETH'] = 11)] = 'WRAP_ETH'
  CommandType[(CommandType['UNWRAP_WETH'] = 12)] = 'UNWRAP_WETH'
  CommandType[(CommandType['PERMIT2_TRANSFER_FROM_BATCH'] = 13)] = 'PERMIT2_TRANSFER_FROM_BATCH'
  // NFT-related command types
  CommandType[(CommandType['SEAPORT'] = 16)] = 'SEAPORT'
  CommandType[(CommandType['LOOKS_RARE_721'] = 17)] = 'LOOKS_RARE_721'
  CommandType[(CommandType['NFTX'] = 18)] = 'NFTX'
  CommandType[(CommandType['CRYPTOPUNKS'] = 19)] = 'CRYPTOPUNKS'
  CommandType[(CommandType['LOOKS_RARE_1155'] = 20)] = 'LOOKS_RARE_1155'
  CommandType[(CommandType['OWNER_CHECK_721'] = 21)] = 'OWNER_CHECK_721'
  CommandType[(CommandType['OWNER_CHECK_1155'] = 22)] = 'OWNER_CHECK_1155'
  CommandType[(CommandType['X2Y2_721'] = 24)] = 'X2Y2_721'
  CommandType[(CommandType['SUDOSWAP'] = 25)] = 'SUDOSWAP'
  CommandType[(CommandType['NFT20'] = 26)] = 'NFT20'
  CommandType[(CommandType['X2Y2_1155'] = 27)] = 'X2Y2_1155'
  CommandType[(CommandType['FOUNDATION'] = 28)] = 'FOUNDATION'
})(CommandType || (CommandType = {}))
var PERMIT_STRUCT =
  '((address token,uint160 amount,uint48 expiration,uint48 nonce) details, address spender, uint256 sigDeadline)'
var PERMIT_BATCH_STRUCT =
  '((address token,uint160 amount,uint48 expiration,uint48 nonce)[] details, address spender, uint256 sigDeadline)'
var ALLOW_REVERT_FLAG = 0x80
var REVERTABLE_COMMANDS = /*#__PURE__*/ new Set([
  CommandType.SEAPORT,
  CommandType.NFTX,
  CommandType.LOOKS_RARE_721,
  CommandType.LOOKS_RARE_1155,
  CommandType.X2Y2_721,
  CommandType.X2Y2_1155,
  CommandType.FOUNDATION,
  CommandType.SUDOSWAP,
  CommandType.NFT20,
  CommandType.CRYPTOPUNKS,
])
var ABI_DEFINITION =
  ((_ABI_DEFINITION = {}),
  (_ABI_DEFINITION[CommandType.PERMIT] = [PERMIT_STRUCT, 'bytes']),
  (_ABI_DEFINITION[CommandType.PERMIT2_PERMIT_BATCH] = [PERMIT_BATCH_STRUCT, 'bytes']),
  (_ABI_DEFINITION[CommandType.PERMIT2_TRANSFER_FROM] = ['address', 'address', 'uint160']),
  (_ABI_DEFINITION[CommandType.PERMIT2_TRANSFER_FROM_BATCH] = ['bytes']),
  (_ABI_DEFINITION[CommandType.TRANSFER] = ['address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.V3_SWAP_EXACT_IN] = ['address', 'uint256', 'uint256', 'bytes', 'bool']),
  (_ABI_DEFINITION[CommandType.V3_SWAP_EXACT_OUT] = ['address', 'uint256', 'uint256', 'bytes', 'bool']),
  (_ABI_DEFINITION[CommandType.V2_SWAP_EXACT_IN] = ['address', 'uint256', 'uint256', 'address[]', 'bool']),
  (_ABI_DEFINITION[CommandType.V2_SWAP_EXACT_OUT] = ['address', 'uint256', 'uint256', 'address[]', 'bool']),
  (_ABI_DEFINITION[CommandType.SEAPORT] = ['uint256', 'bytes']),
  (_ABI_DEFINITION[CommandType.WRAP_ETH] = ['address', 'uint256']),
  (_ABI_DEFINITION[CommandType.UNWRAP_WETH] = ['address', 'uint256']),
  (_ABI_DEFINITION[CommandType.SWEEP] = ['address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.NFTX] = ['uint256', 'bytes']),
  (_ABI_DEFINITION[CommandType.LOOKS_RARE_721] = ['uint256', 'bytes', 'address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.LOOKS_RARE_1155] = ['uint256', 'bytes', 'address', 'address', 'uint256', 'uint256']),
  (_ABI_DEFINITION[CommandType.X2Y2_721] = ['uint256', 'bytes', 'address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.X2Y2_1155] = ['uint256', 'bytes', 'address', 'address', 'uint256', 'uint256']),
  (_ABI_DEFINITION[CommandType.FOUNDATION] = ['uint256', 'bytes', 'address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.PAY_PORTION] = ['address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.SUDOSWAP] = ['uint256', 'bytes']),
  (_ABI_DEFINITION[CommandType.OWNER_CHECK_721] = ['address', 'address', 'uint256']),
  (_ABI_DEFINITION[CommandType.OWNER_CHECK_1155] = ['address', 'address', 'uint256', 'uint256']),
  (_ABI_DEFINITION[CommandType.NFT20] = ['uint256', 'bytes']),
  (_ABI_DEFINITION[CommandType.CRYPTOPUNKS] = ['uint256', 'address', 'uint256']),
  _ABI_DEFINITION)
var RoutePlanner = /*#__PURE__*/ (function () {
  function RoutePlanner() {
    this.commands = '0x'
    this.inputs = []
  }
  var _proto = RoutePlanner.prototype
  _proto.addCommand = function addCommand(type, parameters, allowRevert) {
    if (allowRevert === void 0) {
      allowRevert = false
    }
    var command = createCommand(type, parameters)
    this.inputs.push(command.encodedInput)
    if (allowRevert) {
      if (!REVERTABLE_COMMANDS.has(command.type)) {
        throw new Error('command type: ' + command.type + ' cannot be allowed to revert')
      }
      command.type = command.type | ALLOW_REVERT_FLAG
    }
    this.commands = this.commands.concat(command.type.toString(16).padStart(2, '0'))
  }
  return RoutePlanner
})()
function createCommand(type, parameters) {
  var encodedInput = utils.defaultAbiCoder.encode(ABI_DEFINITION[type], parameters)
  return {
    type: type,
    encodedInput: encodedInput,
  }
}

var UNIVERSAL_ROUTER_ADDRESS = function UNIVERSAL_ROUTER_ADDRESS(chainId) {
  switch (chainId) {
    case 1:
      // mainnet
      return '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B'
    case 205205:
      // aurolia
      return '0xfcEeF4e799E4dC0FDa88cEdfE700d626f91D2da6'
    case 105105:
      return '0xEE87B4bFfCAB73622834cdAf6EC96Ab6EFad6D8d'

    case 5:
      // goerli
      return '0x4648a43B2C14Da09FdF82B161150d3F634f40491'
    case 137:
      // polygon
      return '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5'
    case 80001:
      // polygon mumbai
      return '0x4648a43B2C14Da09FdF82B161150d3F634f40491'
    case 10:
      // optimism
      return '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654'
    case 420:
      // optimism goerli
      return '0x4648a43B2C14Da09FdF82B161150d3F634f40491'
    case 42161:
      // arbitrum
      return '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5'
    case 421613:
      // arbitrum goerli
      return '0x4648a43B2C14Da09FdF82B161150d3F634f40491'
    case 42220:
      // celo
      return '0xC73d61d192FB994157168Fb56730FdEc64C9Cb8F'
    case 44787:
      // celo alfajores
      return '0x4648a43B2C14Da09FdF82B161150d3F634f40491'
    case 56:
      // binance smart chain
      return '0x5Dc88340E1c5c6366864Ee415d6034cadd1A9897'
    default:
      throw new Error('Universal Router not deployed on chain ' + chainId)
  }
}
var WETH_ADDRESS = function WETH_ADDRESS(chainId) {
  switch (chainId) {
    case 1:
      //mainnet
      return '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    case 205205:
      return '0x7b7E6F779c497df2e9EAF8C311d44A296E4F316D'
    case 105105:
      return '0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18'
    case 5:
      // goerli
      return '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
    case 137:
      // polygon
      return '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
    case 80001:
      // polygon mumbai
      return '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
    case 10:
      // optimism
      return '0x4200000000000000000000000000000000000006'
    case 420:
      // optimism goerli
      return '0x4200000000000000000000000000000000000006'
    case 42161:
      // arbitrum
      return '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
    case 421613:
      // arbitrum goerli
      return '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3'
    case 56:
      // binance smart chain
      return '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

    default:
      throw new Error('WETH9 or UniversalRouter not deployed on chain ' + chainId)
  }
}
var PERMIT2_ADDRESS = '0x091826D697Eba3a84847669290Fe37acf333D14D'
var CONTRACT_BALANCE = /*#__PURE__*/ ethers.BigNumber.from(2).pow(255)
var ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
var SENDER_AS_RECIPIENT = '0x0000000000000000000000000000000000000001'
var ROUTER_AS_RECIPIENT = '0x0000000000000000000000000000000000000002'

var REFUND_ETH_PRICE_IMPACT_THRESHOLD = /*#__PURE__*/ new sdkCore.Percent(
  /*#__PURE__*/ JSBI.BigInt(50),
  /*#__PURE__*/ JSBI.BigInt(100)
)
// Wrapper for uniswap router-sdk trade entity to encode swaps for Universal Router
// also translates trade objects from previous (v2, v3) SDKs
var UniswapTrade = /*#__PURE__*/ (function () {
  function UniswapTrade(trade, options) {
    this.trade = trade
    this.options = options
    this.tradeType = exports.RouterTradeType.UniswapTrade
  }
  var _proto = UniswapTrade.prototype
  _proto.encode = function encode(planner, _config) {
    var _this$options$recipie
    var payerIsUser = true
    if (this.trade.inputAmount.currency.isNative) {
      // TODO: optimize if only one v2 pool we can directly send this to the pool
      planner.addCommand(CommandType.WRAP_ETH, [
        ROUTER_AS_RECIPIENT,
        this.trade.maximumAmountIn(this.options.slippageTolerance).quotient.toString(),
      ])
      // since WETH is now owned by the router, the router pays for inputs
      payerIsUser = false
    }
    this.options.recipient =
      (_this$options$recipie = this.options.recipient) != null ? _this$options$recipie : SENDER_AS_RECIPIENT
    // flag for whether we want to perform slippage check on aggregate output of multiple routes
    //   1. when there are >2 exact input trades. this is only a heuristic,
    //      as it's still more gas-expensive even in this case, but has benefits
    //      in that the reversion probability is lower
    var performAggregatedSlippageCheck =
      this.trade.tradeType === sdkCore.TradeType.EXACT_INPUT && this.trade.routes.length > 2
    var outputIsNative = this.trade.outputAmount.currency.isNative
    var inputIsNative = this.trade.inputAmount.currency.isNative
    var routerMustCustody = performAggregatedSlippageCheck || outputIsNative
    for (var _iterator = _createForOfIteratorHelperLoose(this.trade.swaps), _step; !(_step = _iterator()).done; ) {
      var swap = _step.value
      switch (swap.route.protocol) {
        case routerSdk.Protocol.V2:
          addV2Swap(planner, swap, this.trade.tradeType, this.options, payerIsUser, routerMustCustody)
          break
        case routerSdk.Protocol.V3:
          addV3Swap(planner, swap, this.trade.tradeType, this.options, payerIsUser, routerMustCustody)
          break
        case routerSdk.Protocol.MIXED:
          addMixedSwap(planner, swap, this.trade.tradeType, this.options, payerIsUser, routerMustCustody)
          break
        default:
          throw new Error('UNSUPPORTED_TRADE_PROTOCOL')
      }
    }
    if (routerMustCustody) {
      if (outputIsNative) {
        planner.addCommand(CommandType.UNWRAP_WETH, [
          this.options.recipient,
          this.trade.minimumAmountOut(this.options.slippageTolerance).quotient.toString(),
        ])
      } else {
        planner.addCommand(CommandType.SWEEP, [
          this.trade.outputAmount.currency.wrapped.address,
          this.options.recipient,
          this.trade.minimumAmountOut(this.options.slippageTolerance).quotient.toString(),
        ])
      }
    }
    if (inputIsNative && (this.trade.tradeType === sdkCore.TradeType.EXACT_OUTPUT || riskOfPartialFill(this.trade))) {
      // for exactOutput swaps that take native currency as input
      // we need to send back the change to the user
      planner.addCommand(CommandType.UNWRAP_WETH, [this.options.recipient, 0])
    }
  }
  return UniswapTrade
})()
// encode a uniswap v2 swap
function addV2Swap(planner, _ref, tradeType, options, payerIsUser, routerMustCustody) {
  var route = _ref.route,
    inputAmount = _ref.inputAmount,
    outputAmount = _ref.outputAmount
  var trade = new v2Sdk.Trade(route, tradeType == sdkCore.TradeType.EXACT_INPUT ? inputAmount : outputAmount, tradeType)
  if (tradeType == sdkCore.TradeType.EXACT_INPUT) {
    planner.addCommand(CommandType.V2_SWAP_EXACT_IN, [
      // if native, we have to unwrap so keep in the router for now
      routerMustCustody ? ROUTER_AS_RECIPIENT : options.recipient,
      trade.maximumAmountIn(options.slippageTolerance).quotient.toString(),
      trade.minimumAmountOut(options.slippageTolerance).quotient.toString(),
      route.path.map(function (pool) {
        return pool.address
      }),
      payerIsUser,
    ])
  } else if (tradeType == sdkCore.TradeType.EXACT_OUTPUT) {
    planner.addCommand(CommandType.V2_SWAP_EXACT_OUT, [
      routerMustCustody ? ROUTER_AS_RECIPIENT : options.recipient,
      trade.minimumAmountOut(options.slippageTolerance).quotient.toString(),
      trade.maximumAmountIn(options.slippageTolerance).quotient.toString(),
      route.path.map(function (pool) {
        return pool.address
      }),
      payerIsUser,
    ])
  }
}
// encode a uniswap v3 swap
function addV3Swap(planner, _ref2, tradeType, options, payerIsUser, routerMustCustody) {
  var route = _ref2.route,
    inputAmount = _ref2.inputAmount,
    outputAmount = _ref2.outputAmount
  var trade = v3Sdk.Trade.createUncheckedTrade({
    route: route,
    inputAmount: inputAmount,
    outputAmount: outputAmount,
    tradeType: tradeType,
  })
  var path = v3Sdk.encodeRouteToPath(route, trade.tradeType === sdkCore.TradeType.EXACT_OUTPUT)
  if (tradeType == sdkCore.TradeType.EXACT_INPUT) {
    planner.addCommand(CommandType.V3_SWAP_EXACT_IN, [
      routerMustCustody ? ROUTER_AS_RECIPIENT : options.recipient,
      trade.maximumAmountIn(options.slippageTolerance).quotient.toString(),
      trade.minimumAmountOut(options.slippageTolerance).quotient.toString(),
      path,
      payerIsUser,
    ])
  } else if (tradeType == sdkCore.TradeType.EXACT_OUTPUT) {
    planner.addCommand(CommandType.V3_SWAP_EXACT_OUT, [
      routerMustCustody ? ROUTER_AS_RECIPIENT : options.recipient,
      trade.minimumAmountOut(options.slippageTolerance).quotient.toString(),
      trade.maximumAmountIn(options.slippageTolerance).quotient.toString(),
      path,
      payerIsUser,
    ])
  }
}
// encode a mixed route swap, i.e. including both v2 and v3 pools
function addMixedSwap(planner, swap, tradeType, options, payerIsUser, routerMustCustody) {
  var route = swap.route,
    inputAmount = swap.inputAmount,
    outputAmount = swap.outputAmount
  var tradeRecipient = routerMustCustody ? ROUTER_AS_RECIPIENT : options.recipient
  // single hop, so it can be reduced to plain v2 or v3 swap logic
  if (route.pools.length === 1) {
    if (route.pools[0] instanceof v3Sdk.Pool) {
      return addV3Swap(planner, swap, tradeType, options, payerIsUser, routerMustCustody)
    } else if (route.pools[0] instanceof v2Sdk.Pair) {
      return addV2Swap(planner, swap, tradeType, options, payerIsUser, routerMustCustody)
    } else {
      throw new Error('Invalid route type')
    }
  }
  var trade = routerSdk.MixedRouteTrade.createUncheckedTrade({
    route: route,
    inputAmount: inputAmount,
    outputAmount: outputAmount,
    tradeType: tradeType,
  })
  var amountIn = trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient.toString()
  var amountOut = trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient.toString()
  // logic from
  // https://github.com/Uniswap/router-sdk/blob/d8eed164e6c79519983844ca8b6a3fc24ebcb8f8/src/swapRouter.ts#L276
  var sections = routerSdk.partitionMixedRouteByProtocol(route)
  var isLastSectionInRoute = function isLastSectionInRoute(i) {
    return i === sections.length - 1
  }
  var outputToken
  var inputToken = route.input.wrapped
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i]
    /// Now, we get output of this section
    outputToken = routerSdk.getOutputOfPools(section, inputToken)
    var newRouteOriginal = new routerSdk.MixedRouteSDK(
      [].concat(section),
      section[0].token0.equals(inputToken) ? section[0].token0 : section[0].token1,
      outputToken
    )
    var newRoute = new routerSdk.MixedRoute(newRouteOriginal)
    /// Previous output is now input
    inputToken = outputToken
    var mixedRouteIsAllV3 = function mixedRouteIsAllV3(route) {
      return route.pools.every(function (pool) {
        return pool instanceof v3Sdk.Pool
      })
    }
    if (mixedRouteIsAllV3(newRoute)) {
      var path = routerSdk.encodeMixedRouteToPath(newRoute)
      planner.addCommand(CommandType.V3_SWAP_EXACT_IN, [
        // if not last section: send tokens directly to the first v2 pair of the next section
        // note: because of the partitioning function we can be sure that the next section is v2
        isLastSectionInRoute(i) ? tradeRecipient : sections[i + 1][0].liquidityToken.address,
        i == 0 ? amountIn : CONTRACT_BALANCE,
        !isLastSectionInRoute(i) ? 0 : amountOut,
        path,
        payerIsUser && i === 0,
      ])
    } else {
      planner.addCommand(CommandType.V2_SWAP_EXACT_IN, [
        isLastSectionInRoute(i) ? tradeRecipient : ROUTER_AS_RECIPIENT,
        i === 0 ? amountIn : CONTRACT_BALANCE,
        !isLastSectionInRoute(i) ? 0 : amountOut,
        newRoute.path.map(function (pool) {
          return pool.address
        }),
        payerIsUser && i === 0,
      ])
    }
  }
}
// if price impact is very high, there's a chance of hitting max/min prices resulting in a partial fill of the swap
function riskOfPartialFill(trade) {
  return trade.priceImpact.greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD)
}

var SIGNATURE_LENGTH = 65
var EIP_2098_SIGNATURE_LENGTH = 64
function encodePermit(planner, permit) {
  var signature = permit.signature
  var length = ethers.ethers.utils.arrayify(permit.signature).length
  // signature data provided for EIP-1271 may have length different from ECDSA signature
  if (length === SIGNATURE_LENGTH || length === EIP_2098_SIGNATURE_LENGTH) {
    // sanitizes signature to cover edge cases of malformed EIP-2098 sigs and v used as recovery id
    signature = ethers.ethers.utils.joinSignature(ethers.ethers.utils.splitSignature(permit.signature))
  }
  planner.addCommand(CommandType.PERMIT, [permit, signature])
}

var SwapRouter = /*#__PURE__*/ (function () {
  function SwapRouter() {}
  SwapRouter.swapCallParameters = function swapCallParameters(trades, config) {
    if (config === void 0) {
      config = {}
    }
    if (!Array.isArray(trades)) trades = [trades]
    var nftTrades = trades.filter(function (trade, _, _ref) {
      return trade.hasOwnProperty('market')
    })
    var allowRevert = nftTrades.length == 1 && nftTrades[0].orders.length == 1 ? false : true
    var planner = new RoutePlanner()
    // track value flow to require the right amount of native value
    var currentNativeValueInRouter = ethers.BigNumber.from(0)
    var transactionValue = ethers.BigNumber.from(0)
    for (var _iterator = _createForOfIteratorHelperLoose(trades), _step; !(_step = _iterator()).done; ) {
      var trade = _step.value
      /**
       * is NFTTrade
       */
      if (trade.tradeType == exports.RouterTradeType.NFTTrade) {
        var nftTrade = trade
        nftTrade.encode(planner, {
          allowRevert: allowRevert,
        })
        var tradePrice = nftTrade.getTotalPrice()
        // send enough native value to contract for NFT purchase
        if (currentNativeValueInRouter.lt(tradePrice)) {
          transactionValue = transactionValue.add(tradePrice.sub(currentNativeValueInRouter))
          currentNativeValueInRouter = ethers.BigNumber.from(0)
        } else {
          currentNativeValueInRouter = currentNativeValueInRouter.sub(tradePrice)
        }
        /**
         * is Uniswap Trade
         */
      } else if (trade.tradeType == exports.RouterTradeType.UniswapTrade) {
        var uniswapTrade = trade
        var inputIsNative = uniswapTrade.trade.inputAmount.currency.isNative
        var outputIsNative = uniswapTrade.trade.outputAmount.currency.isNative
        var swapOptions = uniswapTrade.options
        !!(inputIsNative && !!swapOptions.inputTokenPermit) ? invariant(false, 'NATIVE_INPUT_PERMIT') : void 0
        if (!!swapOptions.inputTokenPermit) {
          encodePermit(planner, swapOptions.inputTokenPermit)
        }
        if (inputIsNative) {
          transactionValue = transactionValue.add(
            ethers.BigNumber.from(uniswapTrade.trade.maximumAmountIn(swapOptions.slippageTolerance).quotient.toString())
          )
        }
        // track amount of native currency in the router
        if (outputIsNative && swapOptions.recipient == ROUTER_AS_RECIPIENT) {
          currentNativeValueInRouter = currentNativeValueInRouter.add(
            ethers.BigNumber.from(
              uniswapTrade.trade.minimumAmountOut(swapOptions.slippageTolerance).quotient.toString()
            )
          )
        }
        uniswapTrade.encode(planner, {
          allowRevert: false,
        })
        /**
         * is UnwrapWETH
         */
      } else if (trade.tradeType == exports.RouterTradeType.UnwrapWETH) {
        var UnwrapWETH = trade
        trade.encode(planner, {
          allowRevert: false,
        })
        currentNativeValueInRouter = currentNativeValueInRouter.add(UnwrapWETH.amount)
        /**
         * else
         */
      } else {
        throw 'trade must be of instance: UniswapTrade or NFTTrade'
      }
    }
    // TODO: matches current logic for now, but should eventually only sweep for multiple NFT trades
    // or NFT trades with potential slippage (i.e. sudo)
    if (nftTrades.length > 0) planner.addCommand(CommandType.SWEEP, [ETH_ADDRESS, SENDER_AS_RECIPIENT, 0])
    return SwapRouter.encodePlan(planner, transactionValue, config)
  }
  /**
   * @deprecated in favor of swapCallParameters. Update before next major version 2.0.0
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given swap.
   * @param trades to produce call parameters for
   */
  SwapRouter.swapNFTCallParameters = function swapNFTCallParameters(trades, config) {
    if (config === void 0) {
      config = {}
    }
    var planner = new RoutePlanner()
    var totalPrice = ethers.BigNumber.from(0)
    var allowRevert = trades.length == 1 && trades[0].orders.length == 1 ? false : true
    for (var _iterator2 = _createForOfIteratorHelperLoose(trades), _step2; !(_step2 = _iterator2()).done; ) {
      var trade = _step2.value
      trade.encode(planner, {
        allowRevert: allowRevert,
      })
      totalPrice = totalPrice.add(trade.getTotalPrice())
    }
    planner.addCommand(CommandType.SWEEP, [ETH_ADDRESS, SENDER_AS_RECIPIENT, 0])
    return SwapRouter.encodePlan(planner, totalPrice, config)
  }
  /**
   * @deprecated in favor of swapCallParameters. Update before next major version 2.0.0
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  SwapRouter.swapERC20CallParameters = function swapERC20CallParameters(trades, options) {
    // TODO: use permit if signature included in swapOptions
    var planner = new RoutePlanner()
    var trade = new UniswapTrade(trades, options)
    var inputCurrency = trade.trade.inputAmount.currency
    !!(inputCurrency.isNative && !!options.inputTokenPermit) ? invariant(false, 'NATIVE_INPUT_PERMIT') : void 0
    if (options.inputTokenPermit) {
      encodePermit(planner, options.inputTokenPermit)
    }
    var nativeCurrencyValue = inputCurrency.isNative
      ? ethers.BigNumber.from(trade.trade.maximumAmountIn(options.slippageTolerance).quotient.toString())
      : ethers.BigNumber.from(0)
    trade.encode(planner, {
      allowRevert: false,
    })
    return SwapRouter.encodePlan(planner, nativeCurrencyValue, {
      deadline: options.deadlineOrPreviousBlockhash
        ? ethers.BigNumber.from(options.deadlineOrPreviousBlockhash)
        : undefined,
    })
  }
  /**
   * Encodes a planned route into a method name and parameters for the Router contract.
   * @param planner the planned route
   * @param nativeCurrencyValue the native currency value of the planned route
   * @param config the router config
   */
  SwapRouter.encodePlan = function encodePlan(planner, nativeCurrencyValue, config) {
    if (config === void 0) {
      config = {}
    }
    var commands = planner.commands,
      inputs = planner.inputs
    var functionSignature = !!config.deadline ? 'execute(bytes,bytes[],uint256)' : 'execute(bytes,bytes[])'
    var parameters = !!config.deadline ? [commands, inputs, config.deadline] : [commands, inputs]
    var calldata = SwapRouter.INTERFACE.encodeFunctionData(functionSignature, parameters)
    return {
      calldata: calldata,
      value: nativeCurrencyValue.toHexString(),
    }
  }
  return SwapRouter
})()
SwapRouter.INTERFACE = /*#__PURE__*/ new abi$7.Interface(UniversalRouter_json.abi)

var NFTTrade = function NFTTrade(market, orders) {
  this.tradeType = exports.RouterTradeType.NFTTrade
  !(orders.length > 0) ? invariant(false, 'no buy Items') : void 0
  this.market = market
  this.orders = orders
}
;(function (Market) {
  Market['Foundation'] = 'foundation'
  Market['LooksRare'] = 'looksrare'
  Market['NFT20'] = 'nft20'
  Market['NFTX'] = 'nftx'
  Market['Seaport'] = 'seaport'
  Market['Sudoswap'] = 'Sudoswap'
  Market['Cryptopunks'] = 'cryptopunks'
  Market['X2Y2'] = 'x2y2'
})(exports.Market || (exports.Market = {}))
;(function (TokenType) {
  TokenType['ERC721'] = 'ERC721'
  TokenType['ERC1155'] = 'ERC1155'
  TokenType['Cryptopunk'] = 'Cryptopunk'
})(exports.TokenType || (exports.TokenType = {}))

var CryptopunkTrade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(CryptopunkTrade, _NFTTrade)
  function CryptopunkTrade(orders) {
    return _NFTTrade.call(this, exports.Market.Cryptopunks, orders) || this
  }
  var _proto = CryptopunkTrade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var item = _step.value
      planner.addCommand(CommandType.CRYPTOPUNKS, [item.tokenId, item.recipient, item.value], config.allowRevert)
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var item = _step2.value
      buyItems.push({
        tokenAddress: CryptopunkTrade.CRYPTOPUNK_ADDRESS,
        tokenId: item.tokenId,
        tokenType: exports.TokenType.Cryptopunk,
      })
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator3 = _createForOfIteratorHelperLoose(this.orders), _step3; !(_step3 = _iterator3()).done; ) {
      var item = _step3.value
      total = total.add(item.value)
    }
    return total
  }
  return CryptopunkTrade
})(NFTTrade)
CryptopunkTrade.CRYPTOPUNK_ADDRESS = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'

var abi = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'treasury',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'feth',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'royaltyRegistry',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'FoundationTreasuryNode_Address_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FoundationTreasuryNode_Caller_Not_Admin',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'buyPrice',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketBuyPrice_Cannot_Buy_At_Lower_Price',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketBuyPrice_Cannot_Buy_Unset_Price',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketBuyPrice_Cannot_Cancel_Unset_Price',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'NFTMarketBuyPrice_Only_Owner_Can_Cancel_Price',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'NFTMarketBuyPrice_Only_Owner_Can_Set_Price',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketBuyPrice_Price_Already_Set',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketBuyPrice_Price_Too_High',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
    ],
    name: 'NFTMarketBuyPrice_Seller_Mismatch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketCore_FETH_Address_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketCore_Only_FETH_Can_Transfer_ETH',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketCore_Seller_Not_Found',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketFees_Address_Does_Not_Support_IRoyaltyRegistry',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketOffer_Cannot_Be_Made_While_In_Auction',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'currentOfferAmount',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketOffer_Offer_Below_Min_Amount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketOffer_Offer_Expired',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'currentOfferFrom',
        type: 'address',
      },
    ],
    name: 'NFTMarketOffer_Offer_From_Does_Not_Match',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minOfferAmount',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketOffer_Offer_Must_Be_At_Least_Min_Amount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketOffer_Provided_Contract_And_TokenId_Count_Must_Match',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketOffer_Reason_Required',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Already_Listed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minAmount',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Bid_Must_Be_At_Least_Min_Amount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Cannot_Admin_Cancel_Without_Reason',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'reservePrice',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Cannot_Bid_Lower_Than_Reserve_Price',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Cannot_Bid_On_Ended_Auction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Cannot_Bid_On_Nonexistent_Auction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Cannot_Cancel_Nonexistent_Auction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Cannot_Finalize_Already_Settled_Auction',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Cannot_Finalize_Auction_In_Progress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Cannot_Rebid_Over_Outstanding_Bid',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Cannot_Update_Auction_In_Progress',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maxDuration',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Exceeds_Max_Duration',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'extensionDuration',
        type: 'uint256',
      },
    ],
    name: 'NFTMarketReserveAuction_Less_Than_Extension_Duration',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Must_Set_Non_Zero_Reserve_Price',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
    ],
    name: 'NFTMarketReserveAuction_Not_Matching_Seller',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'NFTMarketReserveAuction_Only_Owner_Can_Update_Auction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Price_Already_Set',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketReserveAuction_Too_Much_Value_Provided',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creatorFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sellerRev',
        type: 'uint256',
      },
    ],
    name: 'BuyPriceAccepted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'BuyPriceCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'BuyPriceInvalidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'BuyPriceSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyReferrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'buyReferrerProtocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'buyReferrerSellerFee',
        type: 'uint256',
      },
    ],
    name: 'BuyReferralPaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creatorFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sellerRev',
        type: 'uint256',
      },
    ],
    name: 'OfferAccepted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'OfferCanceledByAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'OfferInvalidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expiration',
        type: 'uint256',
      },
    ],
    name: 'OfferMade',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'bidder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
    ],
    name: 'ReserveAuctionBidPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'ReserveAuctionCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'ReserveAuctionCanceledByAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'extensionDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reservePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'ReserveAuctionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'bidder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creatorFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sellerRev',
        type: 'uint256',
      },
    ],
    name: 'ReserveAuctionFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'ReserveAuctionInvalidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reservePrice',
        type: 'uint256',
      },
    ],
    name: 'ReserveAuctionUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawalToFETH',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'offerFrom',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minAmount',
        type: 'uint256',
      },
    ],
    name: 'acceptOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'nftContracts',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'adminCancelOffers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'adminCancelReserveAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxPrice',
        type: 'uint256',
      },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxPrice',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'buyV2',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'cancelBuyPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'cancelReserveAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reservePrice',
        type: 'uint256',
      },
    ],
    name: 'createReserveAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'finalizeReserveAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getBuyPrice',
    outputs: [
      {
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'getFeesAndRecipients',
    outputs: [
      {
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'creatorRev',
        type: 'uint256',
      },
      {
        internalType: 'address payable[]',
        name: 'creatorRecipients',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'creatorShares',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'sellerRev',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFethAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'fethAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFoundationTreasury',
    outputs: [
      {
        internalType: 'address payable',
        name: 'treasuryAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getImmutableRoyalties',
    outputs: [
      {
        internalType: 'address payable[]',
        name: 'recipients',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'splitPerRecipientInBasisPoints',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'getMinBidAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'minimum',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getMinOfferAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'minimum',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'getMutableRoyalties',
    outputs: [
      {
        internalType: 'address payable[]',
        name: 'recipients',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'splitPerRecipientInBasisPoints',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getOffer',
    outputs: [
      {
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'expiration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getOfferReferrer',
    outputs: [
      {
        internalType: 'address payable',
        name: 'referrer',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'getReserveAuction',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'nftContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'extensionDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'bidder',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct NFTMarketReserveAuction.ReserveAuction',
        name: 'auction',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'getReserveAuctionBidReferrer',
    outputs: [
      {
        internalType: 'address payable',
        name: 'referrer',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getReserveAuctionIdFor',
    outputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRoyaltyRegistry',
    outputs: [
      {
        internalType: 'address',
        name: 'registry',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getTokenCreator',
    outputs: [
      {
        internalType: 'address payable',
        name: 'creator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'makeOffer',
    outputs: [
      {
        internalType: 'uint256',
        name: 'expiration',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'makeOfferV2',
    outputs: [
      {
        internalType: 'uint256',
        name: 'expiration',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'placeBidV2',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'setBuyPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reservePrice',
        type: 'uint256',
      },
    ],
    name: 'updateReserveAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

var FoundationTrade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(FoundationTrade, _NFTTrade)
  function FoundationTrade(orders) {
    return _NFTTrade.call(this, exports.Market.Foundation, orders) || this
  }
  var _proto = FoundationTrade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var item = _step.value
      var calldata = FoundationTrade.INTERFACE.encodeFunctionData('buyV2', [
        item.tokenAddress,
        item.tokenId,
        item.price,
        item.referrer,
      ])
      planner.addCommand(
        CommandType.FOUNDATION,
        [item.price, calldata, item.recipient, item.tokenAddress, item.tokenId],
        config.allowRevert
      )
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var item = _step2.value
      buyItems.push({
        tokenAddress: item.tokenAddress,
        tokenId: item.tokenId,
        tokenType: exports.TokenType.ERC721,
      })
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator3 = _createForOfIteratorHelperLoose(this.orders), _step3; !(_step3 = _iterator3()).done; ) {
      var item = _step3.value
      total = total.add(item.price)
    }
    return total
  }
  return FoundationTrade
})(NFTTrade)
FoundationTrade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi)

var abi$1 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_currencyManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_executionManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_royaltyFeeManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_WETH',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_protocolFeeRecipient',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMinNonce',
        type: 'uint256',
      },
    ],
    name: 'CancelAllOrders',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'orderNonces',
        type: 'uint256[]',
      },
    ],
    name: 'CancelMultipleOrders',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'currencyManager',
        type: 'address',
      },
    ],
    name: 'NewCurrencyManager',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'executionManager',
        type: 'address',
      },
    ],
    name: 'NewExecutionManager',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'protocolFeeRecipient',
        type: 'address',
      },
    ],
    name: 'NewProtocolFeeRecipient',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'royaltyFeeManager',
        type: 'address',
      },
    ],
    name: 'NewRoyaltyFeeManager',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'transferSelectorNFT',
        type: 'address',
      },
    ],
    name: 'NewTransferSelectorNFT',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'royaltyRecipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RoyaltyPayment',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderNonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'strategy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'TakerAsk',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderNonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'strategy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'TakerBid',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minNonce',
        type: 'uint256',
      },
    ],
    name: 'cancelAllOrdersForSender',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'orderNonces',
        type: 'uint256[]',
      },
    ],
    name: 'cancelMultipleMakerOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currencyManager',
    outputs: [
      {
        internalType: 'contract ICurrencyManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'executionManager',
    outputs: [
      {
        internalType: 'contract IExecutionManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'orderNonce',
        type: 'uint256',
      },
    ],
    name: 'isUserOrderNonceExecutedOrCancelled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOrderAsk',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minPercentageToAsk',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'params',
            type: 'bytes',
          },
        ],
        internalType: 'struct OrderTypes.TakerOrder',
        name: 'takerBid',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOrderAsk',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minPercentageToAsk',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'params',
            type: 'bytes',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct OrderTypes.MakerOrder',
        name: 'makerAsk',
        type: 'tuple',
      },
    ],
    name: 'matchAskWithTakerBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOrderAsk',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minPercentageToAsk',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'params',
            type: 'bytes',
          },
        ],
        internalType: 'struct OrderTypes.TakerOrder',
        name: 'takerBid',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOrderAsk',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minPercentageToAsk',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'params',
            type: 'bytes',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct OrderTypes.MakerOrder',
        name: 'makerAsk',
        type: 'tuple',
      },
    ],
    name: 'matchAskWithTakerBidUsingETHAndWETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOrderAsk',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minPercentageToAsk',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'params',
            type: 'bytes',
          },
        ],
        internalType: 'struct OrderTypes.TakerOrder',
        name: 'takerAsk',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOrderAsk',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minPercentageToAsk',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'params',
            type: 'bytes',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct OrderTypes.MakerOrder',
        name: 'makerBid',
        type: 'tuple',
      },
    ],
    name: 'matchBidWithTakerAsk',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'protocolFeeRecipient',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'royaltyFeeManager',
    outputs: [
      {
        internalType: 'contract IRoyaltyFeeManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferSelectorNFT',
    outputs: [
      {
        internalType: 'contract ITransferSelectorNFT',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_currencyManager',
        type: 'address',
      },
    ],
    name: 'updateCurrencyManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_executionManager',
        type: 'address',
      },
    ],
    name: 'updateExecutionManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_protocolFeeRecipient',
        type: 'address',
      },
    ],
    name: 'updateProtocolFeeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_royaltyFeeManager',
        type: 'address',
      },
    ],
    name: 'updateRoyaltyFeeManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_transferSelectorNFT',
        type: 'address',
      },
    ],
    name: 'updateTransferSelectorNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userMinOrderNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

var LooksRareTrade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(LooksRareTrade, _NFTTrade)
  function LooksRareTrade(orders) {
    return _NFTTrade.call(this, exports.Market.LooksRare, orders) || this
  }
  var _proto = LooksRareTrade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var item = _step.value
      var calldata = LooksRareTrade.INTERFACE.encodeFunctionData('matchAskWithTakerBidUsingETHAndWETH', [
        item.takerOrder,
        item.makerOrder,
      ])
      if (item.tokenType == exports.TokenType.ERC721) {
        !(item.makerOrder.amount == 1) ? invariant(false, 'ERC721 token amount must be 1') : void 0
        planner.addCommand(
          CommandType.LOOKS_RARE_721,
          [item.makerOrder.price, calldata, item.recipient, item.makerOrder.collection, item.makerOrder.tokenId],
          config.allowRevert
        )
      } else if (item.tokenType == exports.TokenType.ERC1155) {
        planner.addCommand(
          CommandType.LOOKS_RARE_1155,
          [
            item.makerOrder.price,
            calldata,
            item.recipient,
            item.makerOrder.collection,
            item.makerOrder.tokenId,
            item.makerOrder.amount,
          ],
          config.allowRevert
        )
      }
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var item = _step2.value
      buyItems.push({
        tokenAddress: item.makerOrder.collection,
        tokenId: item.makerOrder.tokenId,
        tokenType: item.tokenType,
      })
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator3 = _createForOfIteratorHelperLoose(this.orders), _step3; !(_step3 = _iterator3()).done; ) {
      var item = _step3.value
      total = total.add(item.makerOrder.price)
    }
    return total
  }
  return LooksRareTrade
})(NFTTrade)
LooksRareTrade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi$1)

var abi$2 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'NFT20',
    outputs: [
      {
        internalType: 'contract INFT20Factory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNIV2',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNIV3',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '_toIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '_toAmounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: '_receipient',
        type: 'address',
      },
      {
        internalType: 'uint24',
        name: '_fee',
        type: 'uint24',
      },
      {
        internalType: 'bool',
        name: 'isV3',
        type: 'bool',
      },
    ],
    name: 'ethForNft',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bool',
        name: 'isErc721',
        type: 'bool',
      },
      {
        internalType: 'uint24',
        name: '_fee',
        type: 'uint24',
      },
      {
        internalType: 'bool',
        name: 'isV3',
        type: 'bool',
      },
    ],
    name: 'nftForEth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'sendTo',
        type: 'address',
      },
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_registry',
        type: 'address',
      },
    ],
    name: 'setNFT20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

var NFT20Trade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(NFT20Trade, _NFTTrade)
  function NFT20Trade(orders) {
    return _NFTTrade.call(this, exports.Market.NFT20, orders) || this
  }
  var _proto = NFT20Trade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var order = _step.value
      var calldata = NFT20Trade.INTERFACE.encodeFunctionData('ethForNft', [
        order.tokenAddress,
        order.tokenIds,
        order.tokenAmounts,
        order.recipient,
        order.fee,
        order.isV3,
      ])
      planner.addCommand(CommandType.NFT20, [order.value, calldata], config.allowRevert)
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var pool = _step2.value
      for (var _iterator3 = _createForOfIteratorHelperLoose(pool.tokenIds), _step3; !(_step3 = _iterator3()).done; ) {
        var tokenId = _step3.value
        buyItems.push({
          tokenAddress: pool.tokenAddress,
          tokenId: tokenId,
          tokenType: exports.TokenType.ERC721,
        })
      }
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator4 = _createForOfIteratorHelperLoose(this.orders), _step4; !(_step4 = _iterator4()).done; ) {
      var item = _step4.value
      total = total.add(item.value)
    }
    return total
  }
  return NFT20Trade
})(NFTTrade)
NFT20Trade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi$2)

var abi$3 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftxFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_sushiRouter',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethSpent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'Buy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethReceived',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'Sell',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethSpent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'contract IWETH',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'specificIds',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'buyAndRedeem',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'specificIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'maxWethIn',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'buyAndRedeemWETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'idsIn',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'specificIds',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'buyAndSwap1155',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'idsIn',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'specificIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'maxWethIn',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'buyAndSwap1155WETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'idsIn',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'specificIds',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'buyAndSwap721',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'idsIn',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'specificIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'maxWethIn',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'buyAndSwap721WETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lpStaking',
    outputs: [
      {
        internalType: 'contract INFTXLPStaking',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'minWethOut',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mintAndSell1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'minWethOut',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mintAndSell1155WETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'minEthOut',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mintAndSell721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'minWethOut',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mintAndSell721WETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftxFactory',
    outputs: [
      {
        internalType: 'contract INFTXVaultFactory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'rescue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sushiRouter',
    outputs: [
      {
        internalType: 'contract IUniswapV2Router01',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

var NFTXTrade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(NFTXTrade, _NFTTrade)
  function NFTXTrade(orders) {
    return _NFTTrade.call(this, exports.Market.NFTX, orders) || this
  }
  var _proto = NFTXTrade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var order = _step.value
      var calldata = NFTXTrade.INTERFACE.encodeFunctionData('buyAndRedeem', [
        order.vaultId,
        order.tokenIds.length,
        order.tokenIds,
        [sdkCore.Ether.onChain(1).wrapped.address, order.vaultAddress],
        order.recipient,
      ])
      planner.addCommand(CommandType.NFTX, [order.value, calldata], config.allowRevert)
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var order = _step2.value
      for (var _iterator3 = _createForOfIteratorHelperLoose(order.tokenIds), _step3; !(_step3 = _iterator3()).done; ) {
        var tokenId = _step3.value
        buyItems.push({
          tokenAddress: order.tokenAddress,
          tokenId: tokenId,
          tokenType: exports.TokenType.ERC721,
        })
      }
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator4 = _createForOfIteratorHelperLoose(this.orders), _step4; !(_step4 = _iterator4()).done; ) {
      var item = _step4.value
      total = total.add(item.value)
    }
    return total
  }
  return NFTXTrade
})(NFTTrade)
NFTXTrade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi$3)

var abi$4 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'conduitController',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'BadContractSignature',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BadFraction',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'BadReturnValueFromERC20OnTransfer',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
    ],
    name: 'BadSignatureV',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ConsiderationCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'considerationIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'shortfallAmount',
        type: 'uint256',
      },
    ],
    name: 'ConsiderationNotMet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CriteriaNotEnabledForItem',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'identifiers',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'ERC1155BatchTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EtherTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InexactFraction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientEtherSupplied',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Invalid1155BatchTransferEncoding',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidBasicOrderParameterEncoding',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'conduit',
        type: 'address',
      },
    ],
    name: 'InvalidCallToConduit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCanceller',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'conduitKey',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'conduit',
        type: 'address',
      },
    ],
    name: 'InvalidConduit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidERC721TransferAmount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFulfillmentComponentData',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'InvalidMsgValue',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidNativeOfferItem',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidProof',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'InvalidRestrictedOrder',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSignature',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSigner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTime',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MismatchedFulfillmentOfferAndConsiderationComponents',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum Side',
        name: 'side',
        type: 'uint8',
      },
    ],
    name: 'MissingFulfillmentComponentOnAggregation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MissingItemAmount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MissingOriginalConsiderationItems',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'NoContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoReentrantCalls',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoSpecifiedOrdersAvailable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OfferAndConsiderationRequiredOnFulfillment',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OfferCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'OrderAlreadyFilled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OrderCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'OrderIsCancelled',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'OrderPartiallyFilled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PartialFillsNotEnabledForOrder',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'identifier',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnresolvedConsiderationCriteria',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnresolvedOfferCriteria',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnusedItemParameters',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCounter',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
    ],
    name: 'CounterIncremented',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'zone',
        type: 'address',
      },
    ],
    name: 'OrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'zone',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'enum ItemType',
            name: 'itemType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct SpentItem[]',
        name: 'offer',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'enum ItemType',
            name: 'itemType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        indexed: false,
        internalType: 'struct ReceivedItem[]',
        name: 'consideration',
        type: 'tuple[]',
      },
    ],
    name: 'OrderFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'zone',
        type: 'address',
      },
    ],
    name: 'OrderValidated',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'zone',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct OfferItem[]',
            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endAmount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ConsiderationItem[]',
            name: 'consideration',
            type: 'tuple[]',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'zoneHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'conduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'counter',
            type: 'uint256',
          },
        ],
        internalType: 'struct OrderComponents[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'cancel',
    outputs: [
      {
        internalType: 'bool',
        name: 'cancelled',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'uint120',
            name: 'numerator',
            type: 'uint120',
          },
          {
            internalType: 'uint120',
            name: 'denominator',
            type: 'uint120',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct AdvancedOrder',
        name: 'advancedOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'enum Side',
            name: 'side',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct CriteriaResolver[]',
        name: 'criteriaResolvers',
        type: 'tuple[]',
      },
      {
        internalType: 'bytes32',
        name: 'fulfillerConduitKey',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'fulfillAdvancedOrder',
    outputs: [
      {
        internalType: 'bool',
        name: 'fulfilled',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'uint120',
            name: 'numerator',
            type: 'uint120',
          },
          {
            internalType: 'uint120',
            name: 'denominator',
            type: 'uint120',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct AdvancedOrder[]',
        name: 'advancedOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'enum Side',
            name: 'side',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct CriteriaResolver[]',
        name: 'criteriaResolvers',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: 'offerFulfillments',
        type: 'tuple[][]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: 'considerationFulfillments',
        type: 'tuple[][]',
      },
      {
        internalType: 'bytes32',
        name: 'fulfillerConduitKey',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'maximumFulfilled',
        type: 'uint256',
      },
    ],
    name: 'fulfillAvailableAdvancedOrders',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'availableOrders',
        type: 'bool[]',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'conduitKey',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Execution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: 'offerFulfillments',
        type: 'tuple[][]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct FulfillmentComponent[][]',
        name: 'considerationFulfillments',
        type: 'tuple[][]',
      },
      {
        internalType: 'bytes32',
        name: 'fulfillerConduitKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'maximumFulfilled',
        type: 'uint256',
      },
    ],
    name: 'fulfillAvailableOrders',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'availableOrders',
        type: 'bool[]',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'conduitKey',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Execution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'considerationToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'considerationIdentifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'considerationAmount',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'zone',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'offerToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'offerIdentifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'offerAmount',
            type: 'uint256',
          },
          {
            internalType: 'enum BasicOrderType',
            name: 'basicOrderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'zoneHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offererConduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'fulfillerConduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'totalOriginalAdditionalRecipients',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct AdditionalRecipient[]',
            name: 'additionalRecipients',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct BasicOrderParameters',
        name: 'parameters',
        type: 'tuple',
      },
    ],
    name: 'fulfillBasicOrder',
    outputs: [
      {
        internalType: 'bool',
        name: 'fulfilled',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct Order',
        name: 'order',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'fulfillerConduitKey',
        type: 'bytes32',
      },
    ],
    name: 'fulfillOrder',
    outputs: [
      {
        internalType: 'bool',
        name: 'fulfilled',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
    ],
    name: 'getCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: 'counter',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'zone',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct OfferItem[]',
            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endAmount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ConsiderationItem[]',
            name: 'consideration',
            type: 'tuple[]',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'zoneHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'conduitKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'counter',
            type: 'uint256',
          },
        ],
        internalType: 'struct OrderComponents',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getOrderHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'getOrderStatus',
    outputs: [
      {
        internalType: 'bool',
        name: 'isValidated',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isCancelled',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'totalFilled',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalSize',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'incrementCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: 'newCounter',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'information',
    outputs: [
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'domainSeparator',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'conduitController',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'uint120',
            name: 'numerator',
            type: 'uint120',
          },
          {
            internalType: 'uint120',
            name: 'denominator',
            type: 'uint120',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct AdvancedOrder[]',
        name: 'advancedOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderIndex',
            type: 'uint256',
          },
          {
            internalType: 'enum Side',
            name: 'side',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'struct CriteriaResolver[]',
        name: 'criteriaResolvers',
        type: 'tuple[]',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'orderIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'itemIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'offerComponents',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'orderIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'itemIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'considerationComponents',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Fulfillment[]',
        name: 'fulfillments',
        type: 'tuple[]',
      },
    ],
    name: 'matchAdvancedOrders',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'conduitKey',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Execution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'orderIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'itemIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'offerComponents',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'orderIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'itemIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct FulfillmentComponent[]',
            name: 'considerationComponents',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Fulfillment[]',
        name: 'fulfillments',
        type: 'tuple[]',
      },
    ],
    name: 'matchOrders',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct ReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'conduitKey',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Execution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: 'contractName',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'offerer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'zone',
                type: 'address',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct OfferItem[]',
                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enum ItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: 'recipient',
                    type: 'address',
                  },
                ],
                internalType: 'struct ConsiderationItem[]',
                name: 'consideration',
                type: 'tuple[]',
              },
              {
                internalType: 'enum OrderType',
                name: 'orderType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'zoneHash',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'conduitKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct OrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'validate',
    outputs: [
      {
        internalType: 'bool',
        name: 'validated',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

var SeaportTrade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(SeaportTrade, _NFTTrade)
  function SeaportTrade(orders) {
    return _NFTTrade.call(this, exports.Market.Seaport, orders) || this
  }
  var _proto = SeaportTrade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var order = _step.value
      var advancedOrders = []
      var orderFulfillments = order.items.map(function (_, index) {
        return [
          {
            orderIndex: index,
            itemIndex: 0,
          },
        ]
      })
      var considerationFulFillments = this.getConsiderationFulfillments(order.items)
      for (var _iterator2 = _createForOfIteratorHelperLoose(order.items), _step2; !(_step2 = _iterator2()).done; ) {
        var item = _step2.value
        var _this$getAdvancedOrde = this.getAdvancedOrderParams(item),
          advancedOrder = _this$getAdvancedOrde.advancedOrder
        advancedOrders.push(advancedOrder)
      }
      var calldata = void 0
      if (advancedOrders.length == 1) {
        calldata = SeaportTrade.INTERFACE.encodeFunctionData('fulfillAdvancedOrder', [
          advancedOrders[0],
          [],
          SeaportTrade.OPENSEA_CONDUIT_KEY,
          order.recipient,
        ])
      } else {
        calldata = SeaportTrade.INTERFACE.encodeFunctionData('fulfillAvailableAdvancedOrders', [
          advancedOrders,
          [],
          orderFulfillments,
          considerationFulFillments,
          SeaportTrade.OPENSEA_CONDUIT_KEY,
          order.recipient,
          100,
        ])
      }
      planner.addCommand(CommandType.SEAPORT, [this.getTotalPrice().toString(), calldata], config.allowRevert)
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator3 = _createForOfIteratorHelperLoose(this.orders), _step3; !(_step3 = _iterator3()).done; ) {
      var order = _step3.value
      for (var _iterator4 = _createForOfIteratorHelperLoose(order.items), _step4; !(_step4 = _iterator4()).done; ) {
        var item = _step4.value
        for (
          var _iterator5 = _createForOfIteratorHelperLoose(item.parameters.offer), _step5;
          !(_step5 = _iterator5()).done;

        ) {
          var offer = _step5.value
          buyItems.push({
            tokenAddress: offer.token,
            tokenId: offer.identifierOrCriteria,
            tokenType: exports.TokenType.ERC721,
          })
        }
      }
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var totalPrice = ethers.BigNumber.from(0)
    for (var _iterator6 = _createForOfIteratorHelperLoose(this.orders), _step6; !(_step6 = _iterator6()).done; ) {
      var order = _step6.value
      for (var _iterator7 = _createForOfIteratorHelperLoose(order.items), _step7; !(_step7 = _iterator7()).done; ) {
        var item = _step7.value
        totalPrice = totalPrice.add(this.calculateValue(item.parameters.consideration))
      }
    }
    return totalPrice
  }
  _proto.getConsiderationFulfillments = function getConsiderationFulfillments(protocolDatas) {
    var considerationFulfillments = []
    var considerationRecipients = []
    for (var i in protocolDatas) {
      var protocolData = protocolDatas[i]
      var _loop = function _loop(j) {
        var item = protocolData.parameters.consideration[j]
        if (
          considerationRecipients.findIndex(function (x) {
            return x === item.recipient
          }) === -1
        ) {
          considerationRecipients.push(item.recipient)
        }
        var recipientIndex = considerationRecipients.findIndex(function (x) {
          return x === item.recipient
        })
        if (!considerationFulfillments[recipientIndex]) {
          considerationFulfillments.push([
            {
              orderIndex: i,
              itemIndex: j,
            },
          ])
        } else {
          considerationFulfillments[recipientIndex].push({
            orderIndex: i,
            itemIndex: j,
          })
        }
      }
      for (var j in protocolData.parameters.consideration) {
        _loop(j)
      }
    }
    return considerationFulfillments
  }
  _proto.getAdvancedOrderParams = function getAdvancedOrderParams(data) {
    var advancedOrder = {
      parameters: data.parameters,
      numerator: ethers.BigNumber.from('1'),
      denominator: ethers.BigNumber.from('1'),
      signature: data.signature,
      extraData: '0x00',
    }
    var value = this.calculateValue(data.parameters.consideration)
    return {
      advancedOrder: advancedOrder,
      value: value,
    }
  }
  _proto.calculateValue = function calculateValue(considerations) {
    return considerations.reduce(function (amt, consideration) {
      return amt.add(consideration.startAmount)
    }, ethers.BigNumber.from(0))
  }
  return SeaportTrade
})(NFTTrade)
SeaportTrade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi$4)
SeaportTrade.OPENSEA_CONDUIT_KEY = '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000'

var abi$5 = [
  {
    inputs: [
      {
        internalType: 'contract ILSSVMPairFactoryLike',
        name: '_factory',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'contract ILSSVMPairFactoryLike',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ERC20',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'enum ILSSVMPairFactoryLike.PairVariant',
        name: 'variant',
        type: 'uint8',
      },
    ],
    name: 'pairTransferERC20From',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC721',
        name: 'nft',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'enum ILSSVMPairFactoryLike.PairVariant',
        name: 'variant',
        type: 'uint8',
      },
    ],
    name: 'pairTransferNFTFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'numItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapAny',
            name: 'swapInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxCost',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairSwapAny[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'robustSwapERC20ForAnyNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific',
            name: 'swapInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxCost',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairSwapSpecific[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'robustSwapERC20ForSpecificNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: 'contract LSSVMPair',
                    name: 'pair',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'nftIds',
                    type: 'uint256[]',
                  },
                ],
                internalType: 'struct LSSVMRouter.PairSwapSpecific',
                name: 'swapInfo',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'maxCost',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.RobustPairSwapSpecific[]',
            name: 'tokenToNFTTrades',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'contract LSSVMPair',
                    name: 'pair',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'nftIds',
                    type: 'uint256[]',
                  },
                ],
                internalType: 'struct LSSVMRouter.PairSwapSpecific',
                name: 'swapInfo',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'minOutput',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.RobustPairSwapSpecificForToken[]',
            name: 'nftToTokenTrades',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'inputAmount',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'tokenRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'nftRecipient',
            type: 'address',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairNFTsFoTokenAndTokenforNFTsTrade',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'robustSwapERC20ForSpecificNFTsAndNFTsToToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'numItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapAny',
            name: 'swapInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxCost',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairSwapAny[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'address payable',
        name: 'ethRecipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'robustSwapETHForAnyNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific',
            name: 'swapInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxCost',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairSwapSpecific[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'address payable',
        name: 'ethRecipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'robustSwapETHForSpecificNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: 'contract LSSVMPair',
                    name: 'pair',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'nftIds',
                    type: 'uint256[]',
                  },
                ],
                internalType: 'struct LSSVMRouter.PairSwapSpecific',
                name: 'swapInfo',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'maxCost',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.RobustPairSwapSpecific[]',
            name: 'tokenToNFTTrades',
            type: 'tuple[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'contract LSSVMPair',
                    name: 'pair',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'nftIds',
                    type: 'uint256[]',
                  },
                ],
                internalType: 'struct LSSVMRouter.PairSwapSpecific',
                name: 'swapInfo',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'minOutput',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.RobustPairSwapSpecificForToken[]',
            name: 'nftToTokenTrades',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'inputAmount',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'tokenRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'nftRecipient',
            type: 'address',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairNFTsFoTokenAndTokenforNFTsTrade',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'robustSwapETHForSpecificNFTsAndNFTsToToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific',
            name: 'swapInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'minOutput',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.RobustPairSwapSpecificForToken[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'address payable',
        name: 'tokenRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'robustSwapNFTsForToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract LSSVMPair',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'numItems',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.PairSwapAny[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapERC20ForAnyNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract LSSVMPair',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'nftIds',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapERC20ForSpecificNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract LSSVMPair',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'numItems',
            type: 'uint256',
          },
        ],
        internalType: 'struct LSSVMRouter.PairSwapAny[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'address payable',
        name: 'ethRecipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapETHForAnyNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract LSSVMPair',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'nftIds',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'address payable',
        name: 'ethRecipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapETHForSpecificNFTs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remainingValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
            name: 'nftToTokenTrades',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'numItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapAny[]',
            name: 'tokenToNFTTrades',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LSSVMRouter.NFTsForAnyNFTsTrade',
        name: 'trade',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minOutput',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapNFTsForAnyNFTsThroughERC20',
    outputs: [
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
            name: 'nftToTokenTrades',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'numItems',
                type: 'uint256',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapAny[]',
            name: 'tokenToNFTTrades',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LSSVMRouter.NFTsForAnyNFTsTrade',
        name: 'trade',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'minOutput',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'ethRecipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapNFTsForAnyNFTsThroughETH',
    outputs: [
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
            name: 'nftToTokenTrades',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
            name: 'tokenToNFTTrades',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LSSVMRouter.NFTsForSpecificNFTsTrade',
        name: 'trade',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minOutput',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapNFTsForSpecificNFTsThroughERC20',
    outputs: [
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
            name: 'nftToTokenTrades',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'contract LSSVMPair',
                name: 'pair',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'nftIds',
                type: 'uint256[]',
              },
            ],
            internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
            name: 'tokenToNFTTrades',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LSSVMRouter.NFTsForSpecificNFTsTrade',
        name: 'trade',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'minOutput',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'ethRecipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapNFTsForSpecificNFTsThroughETH',
    outputs: [
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract LSSVMPair',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'nftIds',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct LSSVMRouter.PairSwapSpecific[]',
        name: 'swapList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'minOutput',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'tokenRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapNFTsForToken',
    outputs: [
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

var SudoswapTrade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(SudoswapTrade, _NFTTrade)
  function SudoswapTrade(orders) {
    return _NFTTrade.call(this, exports.Market.Sudoswap, orders) || this
  }
  var _proto = SudoswapTrade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var order = _step.value
      var calldata = SudoswapTrade.INTERFACE.encodeFunctionData('robustSwapETHForSpecificNFTs', [
        order.swaps.map(function (swap) {
          return {
            swapInfo: swap.swapInfo,
            maxCost: swap.maxCost,
          }
        }),
        order.ethRecipient,
        order.nftRecipient,
        order.deadline,
      ])
      var value = order.swaps.reduce(function (prevVal, swap) {
        return prevVal.add(swap.maxCost)
      }, ethers.BigNumber.from(0))
      planner.addCommand(CommandType.SUDOSWAP, [value, calldata], config.allowRevert)
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var order = _step2.value
      for (var _iterator3 = _createForOfIteratorHelperLoose(order.swaps), _step3; !(_step3 = _iterator3()).done; ) {
        var swap = _step3.value
        for (
          var _iterator4 = _createForOfIteratorHelperLoose(swap.swapInfo.nftIds), _step4;
          !(_step4 = _iterator4()).done;

        ) {
          var tokenId = _step4.value
          buyItems.push({
            tokenAddress: swap.tokenAddress,
            tokenId: tokenId,
            tokenType: exports.TokenType.ERC721,
          })
        }
      }
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator5 = _createForOfIteratorHelperLoose(this.orders), _step5; !(_step5 = _iterator5()).done; ) {
      var order = _step5.value
      for (var _iterator6 = _createForOfIteratorHelperLoose(order.swaps), _step6; !(_step6 = _iterator6()).done; ) {
        var swap = _step6.value
        total = total.add(swap.maxCost)
      }
    }
    return total
  }
  return SudoswapTrade
})(NFTTrade)
SudoswapTrade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi$5)

var abi$6 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'itemHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'incentive',
        type: 'uint256',
      },
    ],
    name: 'EvAuctionRefund',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'itemHash',
        type: 'bytes32',
      },
    ],
    name: 'EvCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'delegate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isRemoval',
        type: 'bool',
      },
    ],
    name: 'EvDelegate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'error',
        type: 'bytes',
      },
    ],
    name: 'EvFailure',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newValue',
        type: 'uint256',
      },
    ],
    name: 'EvFeeCapUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'itemHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderSalt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'settleSalt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'intent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'delegateType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20Upgradeable',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'dataMask',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct Market.OrderItem',
        name: 'item',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum Market.Op',
            name: 'op',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'orderIdx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIdx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'itemHash',
            type: 'bytes32',
          },
          {
            internalType: 'contract IDelegate',
            name: 'executionDelegate',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'dataReplacement',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'bidIncentivePct',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aucMinIncrementPct',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aucIncDurationSecs',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'percentage',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
            ],
            internalType: 'struct Market.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
        ],
        indexed: false,
        internalType: 'struct Market.SettleDetail',
        name: 'detail',
        type: 'tuple',
      },
    ],
    name: 'EvInventory',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'itemHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EvProfit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isRemoval',
        type: 'bool',
      },
    ],
    name: 'EvSigner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'RATE_BASE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'itemHashes',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'delegates',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeCapPct',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'feeCapPct_',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'weth_',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'inventoryStatus',
    outputs: [
      {
        internalType: 'enum Market.InvStatus',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'ongoingAuctions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'netPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endAt',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'bidder',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'user',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'network',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'intent',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'delegateType',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
              },
              {
                internalType: 'contract IERC20Upgradeable',
                name: 'currency',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'dataMask',
                type: 'bytes',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'price',
                    type: 'uint256',
                  },
                  {
                    internalType: 'bytes',
                    name: 'data',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct Market.OrderItem[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
              },
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
              },
              {
                internalType: 'uint8',
                name: 'signVersion',
                type: 'uint8',
              },
            ],
            internalType: 'struct Market.Order[]',
            name: 'orders',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum Market.Op',
                name: 'op',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'orderIdx',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'itemIdx',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'itemHash',
                type: 'bytes32',
              },
              {
                internalType: 'contract IDelegate',
                name: 'executionDelegate',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'dataReplacement',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'bidIncentivePct',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'aucMinIncrementPct',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'aucIncDurationSecs',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'percentage',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                  },
                ],
                internalType: 'struct Market.Fee[]',
                name: 'fees',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct Market.SettleDetail[]',
            name: 'details',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amountToEth',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amountToWeth',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'user',
                type: 'address',
              },
              {
                internalType: 'bool',
                name: 'canFail',
                type: 'bool',
              },
            ],
            internalType: 'struct Market.SettleShared',
            name: 'shared',
            type: 'tuple',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
        ],
        internalType: 'struct Market.RunInput',
        name: 'input',
        type: 'tuple',
      },
    ],
    name: 'run',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'network',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'intent',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'delegateType',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'dataMask',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            internalType: 'struct Market.OrderItem[]',
            name: 'items',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'signVersion',
            type: 'uint8',
          },
        ],
        internalType: 'struct Market.Order',
        name: 'order',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountToEth',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountToWeth',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'canFail',
            type: 'bool',
          },
        ],
        internalType: 'struct Market.SettleShared',
        name: 'shared',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum Market.Op',
            name: 'op',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'orderIdx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIdx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'itemHash',
            type: 'bytes32',
          },
          {
            internalType: 'contract IDelegate',
            name: 'executionDelegate',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'dataReplacement',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'bidIncentivePct',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aucMinIncrementPct',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aucIncDurationSecs',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'percentage',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
            ],
            internalType: 'struct Market.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Market.SettleDetail',
        name: 'detail',
        type: 'tuple',
      },
    ],
    name: 'run1',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'signers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'toAdd',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'toRemove',
        type: 'address[]',
      },
    ],
    name: 'updateDelegates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'updateFeeCap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'toAdd',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'toRemove',
        type: 'address[]',
      },
    ],
    name: 'updateSigners',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weth',
    outputs: [
      {
        internalType: 'contract IWETHUpgradable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

var X2Y2Trade = /*#__PURE__*/ (function (_NFTTrade) {
  _inheritsLoose(X2Y2Trade, _NFTTrade)
  function X2Y2Trade(orders) {
    return _NFTTrade.call(this, exports.Market.X2Y2, orders) || this
  }
  var _proto = X2Y2Trade.prototype
  _proto.encode = function encode(planner, config) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.orders), _step; !(_step = _iterator()).done; ) {
      var item = _step.value
      var functionSelector = X2Y2Trade.INTERFACE.getSighash(X2Y2Trade.INTERFACE.getFunction('run'))
      var calldata = functionSelector + item.signedInput.slice(2)
      if (item.tokenType == exports.TokenType.ERC721) {
        planner.addCommand(
          CommandType.X2Y2_721,
          [item.price, calldata, item.recipient, item.tokenAddress, item.tokenId],
          config.allowRevert
        )
      } else if (item.tokenType == exports.TokenType.ERC1155) {
        planner.addCommand(
          CommandType.X2Y2_1155,
          [item.price, calldata, item.recipient, item.tokenAddress, item.tokenId, item.tokenAmount],
          config.allowRevert
        )
      }
    }
  }
  _proto.getBuyItems = function getBuyItems() {
    var buyItems = []
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.orders), _step2; !(_step2 = _iterator2()).done; ) {
      var item = _step2.value
      buyItems.push({
        tokenAddress: item.tokenAddress,
        tokenId: item.tokenId,
        tokenType: item.tokenType,
      })
    }
    return buyItems
  }
  _proto.getTotalPrice = function getTotalPrice() {
    var total = ethers.BigNumber.from(0)
    for (var _iterator3 = _createForOfIteratorHelperLoose(this.orders), _step3; !(_step3 = _iterator3()).done; ) {
      var item = _step3.value
      total = total.add(item.price)
    }
    return total
  }
  return X2Y2Trade
})(NFTTrade)
X2Y2Trade.INTERFACE = /*#__PURE__*/ new abi$7.Interface(abi$6)

var UnwrapWETH = /*#__PURE__*/ (function () {
  function UnwrapWETH(amount, chainId, permit2) {
    this.tradeType = exports.RouterTradeType.UnwrapWETH
    this.wethAddress = WETH_ADDRESS(chainId)
    this.routerAddress = UNIVERSAL_ROUTER_ADDRESS(chainId)
    this.amount = amount
    if (!!permit2) {
      !(permit2.details.token === this.wethAddress)
        ? invariant(false, 'must be permitting WETH address: ' + this.wethAddress)
        : void 0
      !(permit2.details.amount >= amount)
        ? invariant(false, 'Did not permit enough WETH for unwrapWETH transaction')
        : void 0
      this.permit2Data = permit2
    }
  }
  var _proto = UnwrapWETH.prototype
  _proto.encode = function encode(planner, _) {
    if (!!this.permit2Data) encodePermit(planner, this.permit2Data)
    planner.addCommand(CommandType.PERMIT2_TRANSFER_FROM, [this.wethAddress, this.routerAddress, this.amount])
    planner.addCommand(CommandType.UNWRAP_WETH, [ROUTER_AS_RECIPIENT, this.amount])
  }
  return UnwrapWETH
})()

exports.CryptopunkTrade = CryptopunkTrade
exports.FoundationTrade = FoundationTrade
exports.LooksRareTrade = LooksRareTrade
exports.NFT20Trade = NFT20Trade
exports.NFTTrade = NFTTrade
exports.NFTXTrade = NFTXTrade
exports.PERMIT2_ADDRESS = PERMIT2_ADDRESS
exports.ROUTER_AS_RECIPIENT = ROUTER_AS_RECIPIENT
exports.SeaportTrade = SeaportTrade
exports.SudoswapTrade = SudoswapTrade
exports.SwapRouter = SwapRouter
exports.UNIVERSAL_ROUTER_ADDRESS = UNIVERSAL_ROUTER_ADDRESS
exports.UniswapTrade = UniswapTrade
exports.UnwrapWETH = UnwrapWETH
exports.WETH_ADDRESS = WETH_ADDRESS
exports.X2Y2Trade = X2Y2Trade
//# sourceMappingURL=universal-router-sdk.cjs.development.js.map
