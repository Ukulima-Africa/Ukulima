import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { networkFilter } from './networkFilter'

const pollWeb3 = async () => {
  const provider = await detectEthereumProvider()
  setInterval(async () => {
    if (provider && $nuxt.$store.state) {
      if (provider && $nuxt.$store.state.account) {
      // if (
      //   provider.chainId !== $nuxt.$store.state.account.chainIdHEX ||
      //   provider.selectedAddress !== $nuxt.$store.state.account.account[0]
      // ) {
        /* Will Check the Current Provider Chain Id Hex */
        const chainId = await provider.request({
          method: 'eth_chainId',
        })
        /* Will get the accounts from Metamask or web3 Provider */
        const accounts = await provider.request({
          method: 'eth_accounts',
        })
        // We currently only ever provide a single account,
        const [...newAccount] = accounts

        const web3 = new Web3(window.ethereum)
        let displayBalance = 0

        await web3.eth.getBalance(
          String(newAccount),
          'latest',
          (err, result) => {
            if (err) {
              console.log("web3.eth.getBalance Fetch Error", err)
            } else {
              displayBalance = web3.utils.fromWei(result, 'ether')
              console.log("displayBalance", displayBalance)
            }
          }
        )
        $nuxt.$store.dispatch('setAccount', {
          account: newAccount,
          chainId: networkFilter(chainId, 'id'),
          chainIdHEX: String(chainId),
          chainName: networkFilter(chainId, 'name'),
          balance: displayBalance,
        })
      }
    }
  }, 3000)
}

export default pollWeb3
