import type { TokenList } from '@uniswap/token-lists'
import { validateTokenList } from '@uniswap/widgets'
import uriToHttp from 'lib/utils/uriToHttp'

// export const DEFAULT_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

const listCache = new Map<string, TokenList>()

/**
 * Fetches and validates a token list.
 * For a given token list URL, we try to fetch the list from all the possible HTTP URLs.
 * For example, IPFS URLs can be fetched through multiple gateways.
 */
export default async function fetchTokenList(
  listUrl: string,
  // resolveENSContentHash: (ensName: string) => Promise<string>,
  skipValidation?: boolean
): Promise<TokenList> {
  const cached = listCache?.get(listUrl) // avoid spurious re-fetches
  if (cached) {
    return cached
  }

  const urls = uriToHttp(listUrl)

  if (urls.length === 0) {
    throw new Error('Unrecognized list URL protocol.')
  }

  // Try each of the derived URLs until one succeeds.
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    let response
    try {
      response = await fetch(url, { credentials: 'omit' })
    } catch (error) {
      console.debug(`failed to fetch list: ${listUrl} (${url})`, error)
      continue
    }

    if (!response.ok) {
      console.debug(`failed to fetch list ${listUrl} (${url})`, response.statusText)
      continue
    }

    try {
      // The content of the result is sometimes invalid even with a 200 status code.
      // A response can be invalid if it's not a valid JSON or if it doesn't match the TokenList schema.
      const json = await response.json()
      const list = skipValidation ? json : await validateTokenList(json)
      listCache?.set(listUrl, list)
      return list
    } catch (error) {
      console.debug(`failed to parse and validate list response: ${listUrl} (${url})`, error)
      continue
    }
  }

  throw new Error(`No valid token list found at any URLs derived from ${listUrl}.`)
}
