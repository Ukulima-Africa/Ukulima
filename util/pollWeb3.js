import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { networkFilter } from './networkFilter'
import { networkSymbol } from './networkSymbol'
/* LFG */
const pollWeb3 = async () => {
  const provider = await detectEthereumProvider()
  setInterval(async () => {
    if (provider) {
      /* Will Check the Current Provider Chain Id Hex */
      const chainId = await provider.request({
        method: 'eth_chainId',
      })
      console.log("chainId", chainId)
      /* Will get the accounts from Metamask or web3 Provider */
      const accounts = await provider.request({
        method: 'eth_accounts',
      })
      console.log("accounts", accounts)
      if (accounts && accounts[0]) {
        // We currently only ever provide a single account,
        const newAccount = accounts[0]
        const web3 = new Web3(window.ethereum)
        let displayBalance = 0.0
        await web3.eth.getBalance(
          String(newAccount),
          'latest',
          (err, result) => {
            if (err) {
              console.log("web3.eth.getBalance Fetch Error", err)
            } else {
              displayBalance = web3.utils.fromWei(result, 'ether')
              console.log("pollWeb3js displayBalance : ", displayBalance)
            }
            return displayBalance
          }
        )
        $nuxt.$store.commit('POLL_WEB3', {
          account: newAccount,
          chainId: networkFilter(chainId, 'id'),
          chainIdHEX: String(chainId),
          chainName: networkFilter(chainId, 'name'),
          symbol: networkSymbol(chainId, 'symbol'),
          balance: displayBalance,
        })
      }
    }
    }, 5000)
}

export default pollWeb3
