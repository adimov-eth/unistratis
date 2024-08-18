import { BigNumber } from '@ethersproject/bignumber'
import JSBI from 'jsbi'
// import { CallStateResult } from 'lib/hooks/multicall'
import { useEffect, useMemo, useState } from 'react'

import { useV3NFTPositionManagerContract } from './useContract'

type TokenId = number | JSBI | BigNumber

const STARTS_WITH = 'data:application/json;base64,'

type UsePositionTokenURIResult =
  | {
      valid: true
      loading: false
      result: {
        name: string
        description: string
        image: string
      }
    }
  | {
      valid: false
      loading: false
    }
  | {
      valid: true
      loading: true
    }

// type CallStateResultWithMeta = CallStateResult & {
//   valid: boolean
//   loading: boolean
//   error?: Error
// }

export function usePositionTokenURI(tokenId: TokenId | undefined): UsePositionTokenURIResult {
  const contract = useV3NFTPositionManagerContract()

  const [result, setResult] = useState<{
    tokenURI?: string
    error?: Error
  } | null>(null)

  useEffect(() => {
    if (!tokenId) {
      setResult(null)
      return
    }

    contract?.callStatic
      .tokenURI(BigNumber.from(tokenId))
      .then((tokenURI: string) => setResult({ tokenURI }))
      .catch((error: Error) => setResult({ error }))
  }, [contract, tokenId])

  return useMemo(() => {
    if (!result) {
      return {
        valid: true,
        loading: true,
      }
    }

    if (result.error) {
      return {
        valid: false,
        loading: false,
      }
    }

    const { tokenURI } = result
    if (!tokenURI || !tokenURI.startsWith(STARTS_WITH)) {
      return {
        valid: false,
        loading: false,
      }
    }

    try {
      const json = JSON.parse(atob(tokenURI.slice(STARTS_WITH.length)))
      return {
        valid: true,
        loading: false,
        result: json,
      }
    } catch (error) {
      return { valid: false, loading: false }
    }
  }, [result])
}
