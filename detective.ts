import { execSync } from 'child_process'
import fs from 'fs'
import { ADDRESSES } from './config/addresses'

console.log('Starting address detection process...')

const polyAddresses = ADDRESSES.POLYGON
const filesByAddress: Record<string, string[]> = {}

console.log('Processing Stratis mainnet addresses...')

for (const [key, address] of Object.entries(polyAddresses)) {
  if (typeof address === 'string') {
    console.log(`Searching for address: ${address} (${key})`)
    try {
      const result = execSync(`grep -rl '${address}' .`, { encoding: 'utf-8' })
      const files = result.split('\n').filter(Boolean)
      filesByAddress[key] = files
      console.log(`Found ${files.length} files for ${key}`)
    } catch (error) {
      console.error(`Error searching for address ${address}: ${error}`)
    }
  } else if (typeof address === 'object') {
    for (const [tokenKey, tokenAddress] of Object.entries(address)) {
      console.log(`Searching for token address: ${tokenAddress} (${key}.${tokenKey})`)
      try {
        const result = execSync(`grep -rl '${tokenAddress}' .`, { encoding: 'utf-8' })
        const files = result.split('\n').filter(Boolean)
        filesByAddress[`${key}.${tokenKey}`] = files
        console.log(`Found ${files.length} files for ${key}.${tokenKey}`)
      } catch (error) {
        console.error(`Error searching for address ${tokenAddress}: ${error}`)
      }
    }
  }
}

console.log('Generating output...')

const output = `/* eslint-disable no-unused-labels */
{
${Object.entries(filesByAddress)
  .map(([key, files]) => `  ${key}: ${JSON.stringify(files, null, 2)}`)
  .join(',\n')}
}
`

fs.writeFileSync('./config/files_by_address.ts', output)
console.log('files_by_address.ts has been updated.')
console.log('Address detection process completed.')
