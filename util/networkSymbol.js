import {
  networks
} from './networks'
/* Filter the network Token Symbol by the HEX chainId received from MetaMask */
/* filterType returns the Token Symbol or the Id */
export function networkSymbol(chainHEX, filterType) {
  let network = ''
  const chainIdentifier = String(chainHEX)
  switch (chainIdentifier) {
    case networks.MAIN_NET.hex:
      network = filterType === 'symbol' ? networks.MAIN_NET.symbol : networks.MAIN_NET.id
      break
    case networks.BINANCE_MAIN_NET.hex:
      network = filterType === 'symbol' ? networks.BINANCE_MAIN_NET.symbol : networks.BINANCE_MAIN_NET.id
      break
    case networks.ROPSTEN_TEST_NET.hex:
      network = filterType === 'symbol' ? networks.ROPSTEN_TEST_NET.symbol : networks.ROPSTEN_TEST_NET.id
      break
    case networks.RINKEBY_TEST_NET.hex:
      network = filterType === 'symbol' ? networks.RINKEBY_TEST_NET.symbol : networks.RINKEBY_TEST_NET.id
      break
    case networks.GOERLI_TEST_NET.hex:
      network = filterType === 'symbol' ? networks.GOERLI_TEST_NET.symbol : networks.GOERLI_TEST_NET.id
      break
    case networks.KOVAN_TEST_NET.hex:
      network = filterType === 'symbol' ? networks.KOVAN_TEST_NET.symbol : networks.KOVAN_TEST_NET.id
      break
    case networks.BINANCE_TEST_NET.hex:
      network = filterType === 'symbol' ? networks.BINANCE_TEST_NET.symbol : networks.BINANCE_TEST_NET.id
      break
    case networks.MATIC_MAIN_NET.hex:
      network = filterType === 'symbol' ? networks.MATIC_MAIN_NET.symbol : networks.MATIC_MAIN_NET.id
      break
    case networks.MUMBAI_TEST_NET.hex:
      network = filterType === 'symbol' ? networks.MUMBAI_TEST_NET.symbol : networks.MUMBAI_TEST_NET.id
      break
    case networks.TRUFFLE_DEV_NET.hex:
      network = filterType === 'symbol' ? networks.TRUFFLE_DEV_NET.symbol : networks.TRUFFLE_DEV_NET.id
      break
    case networks.GANACHE_DEV_NET.hex:
      network = filterType === 'symbol' ? networks.GANACHE_DEV_NET.symbol : networks.GANACHE_DEV_NET.id
      break
    case networks.LOCALHOST.hex:
      network = filterType === 'symbol' ? networks.LOCALHOST.symbol : networks.LOCALHOST.id
      break
    default:
      network = filterType === 'symbol' ? networks.LOCALHOST.symbol : networks.LOCALHOST.id
  }
  return network
}
