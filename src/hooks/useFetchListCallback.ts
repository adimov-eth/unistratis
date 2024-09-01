import { nanoid } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'
import getTokenList from 'lib/hooks/useTokenList/fetchTokenList'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'

import { fetchTokenList } from '../state/lists/actions'

export function useFetchListCallback(): (listUrl: string, skipValidation?: boolean) => Promise<TokenList> {
  const dispatch = useAppDispatch()

  return useCallback(
    async (listUrl: string, skipValidation?: boolean) => {
      const requestId = nanoid()
      dispatch(fetchTokenList.pending({ requestId, url: listUrl }))
      return getTokenList(
        listUrl,
        // (ensName: string) => resolveENSContentHash(ensName, RPC_PROVIDERS[SupportedChainId.MAINNET]),
        skipValidation
      )
        .then((tokenList) => {
          dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }))
          return tokenList
        })
        .catch((error) => {
          console.debug(`Failed to get list at url ${listUrl}`, error)
          dispatch(
            fetchTokenList.rejected({
              url: listUrl,
              requestId,
              errorMessage: error.message,
            })
          )
          throw error
        })
    },
    [dispatch]
  )
}
