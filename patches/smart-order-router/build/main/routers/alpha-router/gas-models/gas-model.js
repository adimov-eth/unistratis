'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.IOnChainGasModelFactory = exports.IV2GasModelFactory = exports.usdGasTokensByChain = void 0
const token_provider_1 = require('../../../providers/token-provider')
const chains_1 = require('../../../util/chains')
exports.usdGasTokensByChain = {
  [chains_1.ChainId.MAINNET]: [
    token_provider_1.DAI_MAINNET,
    token_provider_1.USDC_MAINNET,
    token_provider_1.USDT_MAINNET,
  ],
  [chains_1.ChainId.RINKEBY]: [token_provider_1.DAI_RINKEBY_1, token_provider_1.DAI_RINKEBY_2],
  [chains_1.ChainId.ARBITRUM_ONE]: [
    token_provider_1.DAI_ARBITRUM,
    token_provider_1.USDC_ARBITRUM,
    token_provider_1.USDT_ARBITRUM,
  ],
  [chains_1.ChainId.OPTIMISM]: [
    token_provider_1.DAI_OPTIMISM,
    token_provider_1.USDC_OPTIMISM,
    token_provider_1.USDT_OPTIMISM,
  ],
  [chains_1.ChainId.OPTIMISM_GOERLI]: [
    token_provider_1.DAI_OPTIMISM_GOERLI,
    token_provider_1.USDC_OPTIMISM_GOERLI,
    token_provider_1.USDT_OPTIMISM_GOERLI,
  ],
  [chains_1.ChainId.OPTIMISTIC_KOVAN]: [
    token_provider_1.DAI_OPTIMISTIC_KOVAN,
    token_provider_1.USDC_OPTIMISTIC_KOVAN,
    token_provider_1.USDT_OPTIMISTIC_KOVAN,
  ],
  [chains_1.ChainId.ARBITRUM_RINKEBY]: [token_provider_1.DAI_ARBITRUM_RINKEBY, token_provider_1.USDT_ARBITRUM_RINKEBY],
  [chains_1.ChainId.ARBITRUM_GOERLI]: [token_provider_1.USDC_ARBITRUM_GOERLI],
  [chains_1.ChainId.KOVAN]: [token_provider_1.DAI_KOVAN, token_provider_1.USDC_KOVAN, token_provider_1.USDT_KOVAN],
  [chains_1.ChainId.GÖRLI]: [
    token_provider_1.DAI_GÖRLI,
    token_provider_1.USDC_GÖRLI,
    token_provider_1.USDT_GÖRLI,
    token_provider_1.WBTC_GÖRLI,
  ],
  [chains_1.ChainId.ROPSTEN]: [
    token_provider_1.DAI_ROPSTEN,
    token_provider_1.USDC_ROPSTEN,
    token_provider_1.USDT_ROPSTEN,
  ],
  [chains_1.ChainId.POLYGON]: [token_provider_1.USDC_POLYGON],
  [chains_1.ChainId.POLYGON_MUMBAI]: [token_provider_1.DAI_POLYGON_MUMBAI],
  [chains_1.ChainId.CELO]: [token_provider_1.CUSD_CELO],
  [chains_1.ChainId.CELO_ALFAJORES]: [token_provider_1.CUSD_CELO_ALFAJORES],
  [chains_1.ChainId.GNOSIS]: [token_provider_1.USDC_ETHEREUM_GNOSIS],
  [chains_1.ChainId.MOONBEAM]: [token_provider_1.USDC_MOONBEAM],
  [chains_1.ChainId.BSC]: [token_provider_1.USDT_BSC, token_provider_1.USDC_BSC, token_provider_1.DAI_BSC],
  [chains_1.ChainId.STRATIS]: [token_provider_1.USDC_STRATIS, token_provider_1.USDT],
}
/**
 * Factory for building gas models that can be used with any route to generate
 * gas estimates.
 *
 * Factory model is used so that any supporting data can be fetched once and
 * returned as part of the model.
 *
 * @export
 * @abstract
 * @class IV2GasModelFactory
 */
class IV2GasModelFactory {}
exports.IV2GasModelFactory = IV2GasModelFactory
/**
 * Factory for building gas models that can be used with any route to generate
 * gas estimates.
 *
 * Factory model is used so that any supporting data can be fetched once and
 * returned as part of the model.
 *
 * @export
 * @abstract
 * @class IOnChainGasModelFactory
 */
class IOnChainGasModelFactory {}
exports.IOnChainGasModelFactory = IOnChainGasModelFactory
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2dhcy1tb2RlbHMvZ2FzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHNFQXdDMkM7QUFTM0MsaURBQStDO0FBUWxDLFFBQUEsbUJBQW1CLEdBQXVDO0lBQ3JFLENBQUMsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLDRCQUFXLEVBQUUsNkJBQVksRUFBRSw2QkFBWSxDQUFDO0lBQzVELENBQUMsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLDhCQUFhLEVBQUUsOEJBQWEsQ0FBQztJQUNqRCxDQUFDLGdCQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyw2QkFBWSxFQUFFLDhCQUFhLEVBQUUsOEJBQWEsQ0FBQztJQUNwRSxDQUFDLGdCQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyw2QkFBWSxFQUFFLDhCQUFhLEVBQUUsOEJBQWEsQ0FBQztJQUNoRSxDQUFDLGdCQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDekIsb0NBQW1CO1FBQ25CLHFDQUFvQjtRQUNwQixxQ0FBb0I7S0FDckI7SUFDRCxDQUFDLGdCQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUMxQixxQ0FBb0I7UUFDcEIsc0NBQXFCO1FBQ3JCLHNDQUFxQjtLQUN0QjtJQUNELENBQUMsZ0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMscUNBQW9CLEVBQUUsc0NBQXFCLENBQUM7SUFDekUsQ0FBQyxnQkFBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMscUNBQW9CLENBQUM7SUFDakQsQ0FBQyxnQkFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMEJBQVMsRUFBRSwyQkFBVSxFQUFFLDJCQUFVLENBQUM7SUFDcEQsQ0FBQyxnQkFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMEJBQVMsRUFBRSwyQkFBVSxFQUFFLDJCQUFVLEVBQUUsMkJBQVUsQ0FBQztJQUNoRSxDQUFDLGdCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyw0QkFBVyxFQUFFLDZCQUFZLEVBQUUsNkJBQVksQ0FBQztJQUM1RCxDQUFDLGdCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyw2QkFBWSxDQUFDO0lBQ2pDLENBQUMsZ0JBQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLG1DQUFrQixDQUFDO0lBQzlDLENBQUMsZ0JBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDBCQUFTLENBQUM7SUFDM0IsQ0FBQyxnQkFBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsb0NBQW1CLENBQUM7SUFDL0MsQ0FBQyxnQkFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMscUNBQW9CLENBQUM7SUFDeEMsQ0FBQyxnQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsOEJBQWEsQ0FBQztJQUNuQyxDQUFDLGdCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx5QkFBUSxFQUFFLHlCQUFRLEVBQUUsd0JBQU8sQ0FBQztDQUM3QyxDQUFDO0FBb0RGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFzQixrQkFBa0I7Q0FPdkM7QUFQRCxnREFPQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFzQix1QkFBdUI7Q0FZNUM7QUFaRCwwREFZQyJ9
