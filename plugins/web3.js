/**
 * @plugin $web3
 * @extends Vue
 * @description Web3 helper plugin
 * @example
 *  this.$web3()
 *  this.$web3.getAccounts(account)
 */
import Vue from 'vue'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { Arkane } from '@arkane-network/web3-arkane-provider/'
/* Contracts ABI */
import UKU_ABI from '../contracts/abi/abi.json'

/* Network Enum */
import { networks } from '../util/networks'

const network = networks.BINANCE_TEST_NET

/* Contract Addresses */
const UKU_BEP20_ADDR =
  network.id === 1 ?
  process.env.UKU_CONTRACT_ADDRESS :
  process.env.UKU_TEST_CONTRACT_ADDRESS

console.log('Choosen Network', network)
console.log('UKU_BEP20_ADDR', UKU_BEP20_ADDR)

/* Arkane Options */
const arkaneOptions = {
  clientId: 'Ukulima',
  // rpcUrl: 'https://kovan.infura.io/v3/YOUR-PROJECT-ID', // optional
  environment: 'staging', // optional, production by default possible values are 'local', 'tst1', 'staging', 'prod'
  windowMode: 'POPUP', // optional, REDIRECT by default
  useOverlayWithPopup: true,
  // bearerTokenProvider: () => 'obtained_bearer_token', // optional, default undefined
  // optional: you can set an identity provider to be used when authenticating
  authenticationOptions: {
    idpHint: 'google',
  },
}

/* Base function to check the Arkane Provider  */
const getArkaneProvider = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    Arkane.createArkaneProviderEngine(arkaneOptions).then((provider) => {
      return provider
    })
  } else {
    // If the provider is not detected, detectEthereumProvider resolves to null
    console.error('Please install MetaMask to continue!')
    return null
  }
  return null
}

/* Base function to check the Ethereum Provider  */
const getWeb3 = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    return provider
  }
  if (window.web3) {
    return new Web3(window.web3)
  }
  // If the provider is not detected, detectEthereumProvider resolves to null
  console.error('Please install MetaMask to continue!')
  return null
}

/* Base Web3 Helper to check provider -> USAGE: this.$web3()  */
const web3 = () => {
  const newWeb3 = getWeb3()
  return newWeb3
}

/* Connect the Arkane Provider */
web3.connectArkaneProvider = async () => {
  const arkaneProvider = await getArkaneProvider()
  return arkaneProvider
}

/* Connect Metamask, returns first Account */
web3.connectMetaMask = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    /* Will also start the MetaMask extension */
    const accounts = await provider
      .request({
        method: 'eth_requestAccounts',
      })
      // .then(handleAccountsChanged)
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Please connect to MetaMask.')
        } else {
          console.error(error)
        }
      })
    console.log("connectMetaMask:", accounts)
    // We currently only ever provide a single account,
    // but the array gives us some room to grow.
    const [...account] = accounts
    return account
  }
  return false
}

/* Gets First Account from Metamask */
web3.getAccount = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    /* Will get the accounts from Metamask or web3 Provider */
    const accounts = await provider.request({
      method: 'eth_accounts',
    })
    console.log("getAccount:", accounts)
    // We currently only ever provide a single account,
    // but the array gives us some room to grow.
    const [...account] = accounts
    return account
  }
  return ''
}

/* Gets All Accounts from Metamask */
web3.getAccounts = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    /* Will Start the metamask extension */
    const accounts = await provider.request({
      method: 'eth_accounts',
    })
    console.log("getAccount:", accounts)
    return accounts
  }
  return false
}

/* Gets The Network or ChainId, returned as a HEX from MetaMask */
web3.getChainId = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    /* Will Start the metamask extension */
    const chainId = await provider.request({
      method: 'eth_chainId',
    })
    return chainId
  }
  return false
}

/* Get the Account Balance */
web3.getBalance = async (account) => {
  const provider = await detectEthereumProvider()
  if (provider) {
    const newWeb3 = new Web3(window.ethereum)
    await newWeb3.eth.getBalance(String(account), 'latest', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        return newWeb3.utils.fromWei(result, 'ether')
      }
      return 0
    })
  }
  return 0
}
/* Buy UKU Token */
web3.buyTokens = async (to, value) => {
  const provider = await detectEthereumProvider()
  if (provider) {
    /* In MetaMask, using the ethereum.request method directly, sending a transaction will involve composing an options object like this: */
    // const transactionParameters = {
    //   nonce: '0x00', // ignored by MetaMask
    //   gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    //   gas: '0x2710', // customizable by user during MetaMask confirmation.
    //   to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
    //   from: ethereum.selectedAddress, // must match user's active address.
    //   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    //   data:
    //     '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    //   chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    // };
    try {
      // txHash is a hex string, as with any RPC call, it may throw an error
      const transactionHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: UKU_BEP20_ADDR,
          to,
          value
        }, ],
      })
      // Handle the result
      console.log(transactionHash)
    } catch (error) {
      console.error(error)
    }
  }
  return false
}

/* Send a Transaction */
web3.sendTransaction = async (from, to, value, gas, gasPrice) => {
  const provider = await detectEthereumProvider()
  if (provider) {
    /* In MetaMask, using the ethereum.request method directly, sending a transaction will involve composing an options object like this: */
    // const transactionParameters = {
    //   nonce: '0x00', // ignored by MetaMask
    //   gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    //   gas: '0x2710', // customizable by user during MetaMask confirmation.
    //   to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
    //   from: ethereum.selectedAddress, // must match user's active address.
    //   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    //   data:
    //     '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    //   chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    // };

    try {
      // txHash is a hex string, as with any RPC call, it may throw an error
      const transactionHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from,
          to,
          value,
          gas,
          gasPrice,
        }, ],
      })
      // Handle the result
      console.log(transactionHash)
    } catch (error) {
      console.error(error)
    }
  }
  return false
}

/* UKU_BEP20 Contract */
web3.getUKUTokenContract = async () => {
  const newWeb3 = getWeb3()
  return new newWeb3.eth.Contract(UKU_ABI, UKU_BEP20_ADDR)
}
web3.getUKUTokenName = async () => {
  const contractToken = this.getUKUTokenContract(UKU_BEP20_ADDR)
  return contractToken.methods.name().call()
}
web3.getUKUTokenContractSymbol = async () => {
  const newWeb3 = getWeb3()
  const contractToken = new newWeb3.eth.Contract(UKU_ABI, UKU_BEP20_ADDR)
  return contractToken.methods.symbol().call()
}

/* Error log -> USAGE: this.$web3.getExplorerURL(network)  */
web3.getExplorerURL = (explorer) => {
  console.log(
    `%c[ Console Log Here : ]\n${JSON.stringify(...explorer, null, 4)}`,
    'color: lightGreen'
  )
  return 'https://testnet.bscscan.com//'
}

/* Setup Namespace */
web3.install = (Vue) => {
  Vue.prototype.$web3 = web3
}

/* Init */
Vue.use(web3)
