import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../../../..';
// Cost for crossing an uninitialized tick.
export const COST_PER_UNINIT_TICK = BigNumber.from(0);
//l2 execution fee on optimism is roughly the same as mainnet
export const BASE_SWAP_COST = (id) => {
  switch (id) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.OPTIMISM:
    case ChainId.OPTIMISM_GOERLI:
    case ChainId.OPTIMISTIC_KOVAN:
    case ChainId.BSC:
    case ChainId.KOVAN:
      return BigNumber.from(2000);
    case ChainId.ARBITRUM_ONE:
    case ChainId.ARBITRUM_RINKEBY:
    case ChainId.ARBITRUM_GOERLI:
      return BigNumber.from(5000);
    case ChainId.POLYGON:
    case ChainId.POLYGON_MUMBAI:
      return BigNumber.from(2000);
    case ChainId.CELO:
    case ChainId.CELO_ALFAJORES:
      return BigNumber.from(2000);
    //TODO determine if sufficient
    case ChainId.GNOSIS:
      return BigNumber.from(2000);
    case ChainId.MOONBEAM:
      return BigNumber.from(2000);
    case ChainId.STRATIS:
      return BigNumber.from(2000);
  }
};
export const COST_PER_INIT_TICK = (id) => {
  switch (id) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.BSC:
    case ChainId.KOVAN:
      return BigNumber.from(31000);
    case ChainId.OPTIMISM:
    case ChainId.OPTIMISM_GOERLI:
    case ChainId.OPTIMISTIC_KOVAN:
      return BigNumber.from(31000);
    case ChainId.ARBITRUM_ONE:
    case ChainId.ARBITRUM_RINKEBY:
    case ChainId.ARBITRUM_GOERLI:
      return BigNumber.from(31000);
    case ChainId.POLYGON:
    case ChainId.POLYGON_MUMBAI:
      return BigNumber.from(31000);
    case ChainId.CELO:
    case ChainId.CELO_ALFAJORES:
      return BigNumber.from(31000);
    case ChainId.GNOSIS:
      return BigNumber.from(31000);
    case ChainId.MOONBEAM:
      return BigNumber.from(31000);
    case ChainId.STRATIS:
      return BigNumber.from(31000);
  }
};
export const COST_PER_HOP = (id) => {
  switch (id) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.KOVAN:
    case ChainId.BSC:
    case ChainId.OPTIMISM:
    case ChainId.OPTIMISM_GOERLI:
    case ChainId.OPTIMISTIC_KOVAN:
      return BigNumber.from(80000);
    case ChainId.ARBITRUM_ONE:
    case ChainId.ARBITRUM_RINKEBY:
    case ChainId.ARBITRUM_GOERLI:
      return BigNumber.from(80000);
    case ChainId.POLYGON:
    case ChainId.POLYGON_MUMBAI:
      return BigNumber.from(80000);
    case ChainId.CELO:
    case ChainId.CELO_ALFAJORES:
      return BigNumber.from(80000);
    case ChainId.GNOSIS:
      return BigNumber.from(80000);
    case ChainId.MOONBEAM:
      return BigNumber.from(80000);
    case ChainId.STRATIS:
      return BigNumber.from(80000);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLWNvc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2dhcy1tb2RlbHMvdjMvZ2FzLWNvc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXRDLDJDQUEyQztBQUMzQyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRELDZEQUE2RDtBQUM3RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxFQUFXLEVBQWEsRUFBRTtJQUN2RCxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNuQixLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDdEIsS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQzdCLEtBQUssT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBQzlCLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNqQixLQUFLLE9BQU8sQ0FBQyxLQUFLO1lBQ2hCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixLQUFLLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDMUIsS0FBSyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDOUIsS0FBSyxPQUFPLENBQUMsZUFBZTtZQUMxQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JC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
