import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client'
import { SupportedChainId } from 'constants/chains'

import store from '../../state/index'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  // [SupportedChainId.MAINNET]: 'http://127.0.0.1:8000/subgraphs/name/ianlapham/uniswap-v3',

  // [SupportedChainId.AURORIA]: 'http://138.201.91.50:8000/subgraphs/name/ianlapham/uniswap-v3',

  [SupportedChainId.STRATIS]: 'http://138.201.91.50:8000/subgraphs/name/ianlapham/uniswap-v3',
}

const httpLink = new HttpLink({
  uri: CHAIN_SUBGRAPH_URL[SupportedChainId.STRATIS],
})

// This middleware will allow us to dynamically update the uri for the requests based off chainId
// For more information: https://www.apollographql.com/docs/react/networking/advanced-http-networking/
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const chainId = store.getState().application.chainId

  operation.setContext(() => ({
    uri:
      chainId && CHAIN_SUBGRAPH_URL[chainId]
        ? CHAIN_SUBGRAPH_URL[chainId]
        : CHAIN_SUBGRAPH_URL[SupportedChainId.STRATIS],
  }))

  return forward(operation)
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})
