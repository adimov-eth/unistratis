const AURORIA_LIST =
  'https://gist.githubusercontent.com/adimov-eth/e3aadcd7328890a0898aa23dd5aec4c9/raw/76e70ff4b4747545267ed1337db9c0ca3eaea8ab/tokenlist.json'
export const STRATIS_LIST =
  'https://gist.githubusercontent.com/adimov-eth/ff27f2cad86f44fff90825475442d3eb/raw/de53e6627712b2fab1fa42283043d30cb8cb2557/maintokenlist.json'

export const UNSUPPORTED_LIST_URLS: string[] = [] //[BA_LIST, UNI_UNSUPPORTED_LIST]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [AURORIA_LIST, STRATIS_LIST]
export const DEFAULT_INACTIVE_LIST_URLS: string[] = [
  // UNI_EXTENDED_LIST,
  // COMPOUND_LIST,
  // AAVE_LIST,
  // CMC_ALL_LIST,
  // COINGECKO_LIST,
  // COINGECKO_BNB_LIST,
  // KLEROS_LIST,
  // GEMINI_LIST,
  // WRAPPED_LIST,
  // SET_LIST,
  // ARBITRUM_LIST,
  // OPTIMISM_LIST,
  // CELO_LIST,
  // PLASMA_BNB_LIST,
  // ...UNSUPPORTED_LIST_URLS,
]

export const DEFAULT_LIST_OF_LISTS: string[] = [...DEFAULT_ACTIVE_LIST_URLS, ...DEFAULT_INACTIVE_LIST_URLS]
