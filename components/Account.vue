<template>
  <div class="row items-start justify-center">
    <div class="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card flat bordered class="uku-card uku-account-card">
        <q-card-section>
          <div class="text-h6">
            {{ title }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p>Arkane userId: {{ profile.userId }}</p>
          <p>Arkane username: {{ profile.preferred_username }}</p>
          <p>Arkane email: {{ profile.email }}</p>
          <p>Arkane name: {{ profile.name }}</p>
          <p>Arkane firstName: {{ profile.firstName }}</p>
          <p>Arkane lastName: {{ profile.lastName }}</p>
          <p>Arkane Wallet: {{ wallet ? wallet.address : '' }}</p>
          <p>Wallet Balance: {{ wallet ? wallet.balance : 0 }}</p>
          <p>Wallet Network: {{ wallet ? wallet.balance : 0 }}</p>
        </q-card-section>
        <q-card-section>
          <q-btn v-if="!profile.userId" flat color="white" class="bg-primary full-width q-mb-sm" label="Connect Arkane" @click="connectArkane()" />
          <q-btn
            color="grey-8"
            class="bg-secondary full-width q-mb-sm"
            label="Send Transaction"
            @click="sendTransaction((from = 'test'), (to = 'test'), (value = 'test'), (gas = 'test'), (gasPrice = 'test'))"
          />

          <!-- async signTransaction(from, to, value) -->
          <q-btn
            outline
            color="primary"
            class="full-width q-mb-sm"
            label="Sign Transaction"
            @click="signTransaction((from = 'test'), (to = 'test'), (value = 'test'))"
          />

          <!-- signData(signatureRequest) -->
          <q-btn outline color="primary" class="full-width q-mb-sm" label="Sign Data" @click="signData()" />

          <!-- signMessage(walletId, data) -->
          <q-btn outline color="primary" class="full-width q-mb-sm" label="Sign Message" @click="signMessage((from = 'test'), (data = 'test'))" />

          <!-- executeTokenTransfer(from, to, value, tokenAddress) -->
          <q-btn
            outline
            color="primary"
            class="full-width q-mb-sm"
            label="Execute Token Transfer"
            @click="executeTokenTransfer((from = 'test'), (to = 'test'), (value = 'test'), (tokenAddress = 'test'))"
          />
          <!-- executeNftTransfer(from, to, tokenAddress, tokenId) -->
          <q-btn
            outline
            color="primary"
            class="full-width q-mb-sm"
            label="Execute Nft Transfer"
            @click="executeNftTransfer((from = 'test'), (to = 'test'), (tokenAddress = 'test'), (tokenId = 'test'))"
          />
          <!-- executeContract(from, to, functionName = 'transfer', address, value) -->
          <q-btn
            outline
            color="primary"
            class="full-width q-mb-sm"
            label="Execute Contract"
            @click="executeContract((from = 'test'), (to = 'test'), (functionName = 'transfer'), (address = 'test'), (value = 'test'))"
          />

          <q-btn outline color="primary" class="full-width q-mb-sm" label="Request Permissions" @click="requestPermissions()" />
        </q-card-section>
        <!-- <q-card-section class="q-pt-none">
          <p>Web3 Instance: {{ account.web3Instance }}</p>
          <p>Is MetaMask: {{ account.isMetaMask }}</p>
          <p>Network: {{ networkFilter(account.chainIdHEX, 'name') }}</p>
          <p>Chain Id HEX: {{ account.chainIdHEX }}</p>
          <p>Network ID: {{ networkFilter(account.chainIdHEX, 'id') }}</p>
          <p>Account: {{ account.account }}</p>
          <p>Symbol: {{ networkSymbol(account.chainIdHEX, 'symbol') }}</p>
          <p>Balance: {{ account.balance }}</p>
        </q-card-section> -->
      </q-card>
    </div>
    <div class="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card flat bordered class="uku-card uku-account-card">
        <q-card-section class="q-pt-none">
          <pre>Profile: {{ profile }}</pre>
          <pre>Wallets: {{ wallet }}</pre>
          <!-- <pre>MetaMask Account: {{ account }}</pre> -->
          <!-- <pre>User: {{ user }}</pre>         -->
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Arkane Connect for Wallet */
import { ArkaneConnect } from '../node_modules/@arkane-network/arkane-connect'
/* Network helper */
import { blockchainSecretTypes } from '../util/blockchainSecretTypes'
// import { networks } from './networks'
import { networkFilter } from '../util/networkFilter'
import { networkColor } from '../util/networkColor'
import { networkSymbol } from '../util/networkSymbol'
/* LFG */
export default {
  name: 'Account',
  data() {
    return {
      title: 'My Account',
      subtitle: 'View details about your Wallet Account',
      network: null,
      blockchainSecretTypes,
    }
  },
  computed: {
    ...mapState(['user', 'account', 'profile', 'wallet']),
    ...mapGetters({
      getUser: 'user',
      getAccount: 'account',
      getProfile: 'profile',
      getWallet: 'wallet',
    }),
    user: {
      get() {
        return this.$store.state.user
      },
      set(value) {
        this.$store.commit('SET_USER', value)
      },
    },
    account: {
      get() {
        return this.$store.state.account
      },
      set(value) {
        this.$store.commit('SET_ACCOUNT', value)
      },
    },
    profile: {
      get() {
        return this.$store.state.profile
      },
      set(value) {
        this.$store.commit('SET_PROFILE', value)
      },
    },
    wallet: {
      get() {
        return this.$store.state.wallet
      },
      set(value) {
        this.$store.commit('SET_WALLET', value)
      },
    },
    networkColor() {
      return networkColor(this.$store.state.account.chainIdHEX, 'color')
    },
    networkIcon() {
      return networkColor(this.$store.state.account.chainIdHEX, 'icon')
    },
  },
  methods: {
    networkFilter(chainId, filterType) {
      return networkFilter(chainId, filterType)
    },
    networkSymbol() {
      return networkSymbol(this.$store.state.account.chainIdHEX, 'symbol')
    },
    async sendTransaction(from, to, value, gas, gasPrice) {
      try {
        const sent = await this.$web3.sendTransaction(from, to, value, gas, gasPrice)
        // Handle the result
        console.log(sent)
      } catch (error) {
        // Handle the error
        console.error(error)
      }
    },
    async connectArkane() {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        const authArkaneAccount = await this.authArkaneAccount(arkaneConnect)
        console.log('authArkaneAccount:', authArkaneAccount)
        if (authArkaneAccount.isAuthenticated === true) {
          this.$store.commit('SET_PROFILE_ISAUTHENTICATED', true)
          /* Get our Arkane Profile Data */
          const arkaneProfile = await this.getArkaneProfile(arkaneConnect)
          console.log('arkaneProfile:', arkaneProfile)
          return arkaneProfile
        }
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    async authArkaneAccount(arkaneConnect) {
      /* Check if a user is authenticated with Arkane */
      const authenticationInstance = await arkaneConnect.checkAuthenticated().then((result) =>
        result
          .authenticated((auth) => {
            console.log(`The user is authenticated: ${auth.subject}`)
            return auth
          })
          .notAuthenticated((auth) => {
            console.log(`The user is NOT authenticated: ${auth}`)
            return false
          }),
      )
      // AuthenticationInstance - see https://docs.arkane.network/widget/widget-advanced/object-type-reference/authenticationinstance
      // {
      //   authenticated?: boolean;
      //   subject?: string;
      //   realmAccess?: { roles: string[] };
      //   resourceAccess?: string[];
      //   token?: string;
      //   tokenParsed?: {
      //     exp?: number;
      //     email?: string,
      //     name?: string,
      //     iat?: number;
      //     nonce?: string;
      //     sub?: string;
      //     session_state?: string;
      //     realm_access?: { roles: string[] };
      //     resource_access?: string[];
      //   };
      //   refreshToken?: string;
      //   refreshTokenParsed?: { nonce?: string };
      //   idToken?: string;
      //   idTokenParsed?: { nonce?: string };
      //   timeSkew?: number;
      // }
      return authenticationInstance
    },
    async getArkaneProfile(arkaneConnect) {
      // const arkaneProfile = await arkaneConnect.api.getProfile()
      //   "userId": "46c87fcb-77ed-4433-a425-814569ca1672",
      //   "username": "karel.striegel@arkane.network",
      //   "email": "karel.striegel@arkane.network",
      //   "firstName": "Karel",
      //   "lastName": "Striegel"
      // }

      /* We load Arkane for the network we on */
      const networkSymbol = this.$store.state.account.symbol
      let currentNetwork = ''
      if (networkSymbol === 'BNB') {
        currentNetwork = this.blockchainSecretTypes.BSC
      } else if (networkSymbol === 'ETH') {
        currentNetwork = this.blockchainSecretTypes.ETHEREUM
      } else if (networkSymbol === 'MATIC') {
        currentNetwork = this.blockchainSecretTypes.MATIC
      } else {
        currentNetwork = this.blockchainSecretTypes.ETHEREUM
      }
      const arkaneAccount = await arkaneConnect.flows
        .getAccount(currentNetwork)
        .then((account) => {
          console.log('arkaneAccount:', account)
          if (account.isAuthenticated) {
            console.log('userId:', account.auth.tokenParsed.sub)
            if (account.auth.tokenParsed.sub) {
              this.$store.commit('SET_PROFILE_USERID', account.auth.tokenParsed.sub)
            }
            console.log('preferred_username:', account.auth.tokenParsed.preferred_username)
            if (account.auth.tokenParsed.preferred_username) {
              this.$store.commit('SET_PROFILE_USERNAME', account.auth.tokenParsed.preferred_username)
            }
            console.log('name:', account.auth.tokenParsed.name)
            if (account.auth.tokenParsed.name) {
              this.$store.commit('SET_PROFILE_NAME', account.auth.tokenParsed.name)
            }
            console.log('email:', account.auth.tokenParsed.email)
            if (account.auth.tokenParsed.email) {
              this.$store.commit('SET_PROFILE_EMAIL', account.auth.tokenParsed.email)
            }
            console.log('given_name:', account.auth.tokenParsed.given_name)
            if (account.auth.tokenParsed.given_name) {
              this.$store.commit('SET_PROFILE_FIRSTNAME', account.auth.tokenParsed.given_name)
            }
            console.log('family_name:', account.auth.tokenParsed.family_name)
            if (account.auth.tokenParsed.family_name) {
              this.$store.commit('SET_PROFILE_LASTNAME', account.auth.tokenParsed.family_name)
            }
            console.log(`%c Account Wallets : ${JSON.stringify(account.wallets, null, 4)}`, 'background: #222; color: #bada55')
            console.log('First wallet address:', account.wallets[0].address)
            console.log('First wallet balance:', account.wallets[0].balance.balance)
            if (account.wallets.length > 0) {
              this.$store.commit('SET_WALLET', account.wallets[0])
              this.$store.commit('SET_WALLETS', account.wallets)
            }
          }
          return account
        })
        .catch((error) => {
          console.log('Error getting Arkane Account info :', error)
          return false
        })
      return arkaneAccount
    },
    /**
     * {
     *   walletId! : string;
     *   to! : string;
     *   secretType! : SecretType;
     *   data! : string;
     *   value! : BigDecimal;
     * }
     */
    async signTransaction(from, to, value) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Launching a transaction */
        const signer = arkaneConnect.createSigner()
        signer
          .executeTransfer({
            walletId: from,
            to,
            value,
            secretType: currentNetwork,
          })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Transaction ${signerResult.result.transactionHash} has been successfully executed!`)
              return signerResult.success
            }
            console.warn(`Something went wrong while executing the transaction`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    async signData(signatureRequest) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* Signing data */
        const signer = arkaneConnect.createSigner()
        signer
          .sign({ ...signatureRequest })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Successfuly signed: ${signerResult.result.signedTransaction}`)
              return signerResult.success
            }
            console.warn(`Something went wrong while signing the request`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    async signMessage(walletId, data) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Signing a message */
        const signer = arkaneConnect.createSigner()
        signer
          .signMessage({
            walletId,
            secretType: currentNetwork,
            data: data ? data : 'I agree with the Terms and Conditions',
          })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Message successfuly signed: ${signerResult.result.signature}`)
              return signerResult.success
            }
            console.warn(`Something went wrong while signing the message`)
            return false
          })
          .catch((error) => {
            console.log('Error signing message :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    /**
     * This function transfers fungible tokens (eg.ERC20/TRC20/VIP180/NEP5/GO20/)
     * from one address to another. The destination can be any blockchain address,
     * a wallet, or a smart contract, it can even be an email address
     * {
     *   walletId! : string;
     *   to! : string;
     *   secretType! : SecretType;
     *   tokenAddress! : string;
     *   value! : BigDecimal;
     * }
     */
    async executeTokenTransfer(from, to, value, tokenAddress) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Launching a transaction */
        const signer = arkaneConnect.createSigner()
        signer
          .executeTokenTransfer({
            walletId: from,
            to,
            value,
            tokenAddress,
            secretType: currentNetwork,
          })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Transaction ${signerResult.result.transactionHash} has been successfully executed!`)
              return signerResult.success
            }
            console.warn(`Something went wrong while executing the transaction`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    /**
     * This function transfers non-fungible tokens (ex. ERC721/ ERC1155 / VIP181/)
     * from one address to another. The destination can be any blockchain address
     * a wallet, or a smart contract, it can even be an email address.
     * {
     *   walletId! : string;
     *   to! : string;
     *   tokenAddress! : string;
     *   tokenId! : string;
     *   secretType! : SecretType;
     * }
     */
    async executeNftTransfer(from, to, tokenAddress, tokenId) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Launching a transaction */
        const signer = arkaneConnect.createSigner()
        signer
          .executeNftTransfer({
            walletId: from,
            to,
            tokenAddress,
            tokenId,
            secretType: currentNetwork,
          })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Transaction ${signerResult.result.transactionHash} has been successfully executed!`)
              return signerResult.success
            }
            console.warn(`Something went wrong while executing the transaction`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    /**
     * This function allows you to execute a function on a smart contract (write).
     * As a result, a new transaction will be submitted to the network containing
     * the smart contract execution.
     * {
     *  secretType: 'ETHEREUM',
     *  walletId: '71dec640-4eb8-4321-adb8-b79461573fc4',
     *  to: '0xf147cA0b981C0CD0955D1323DB9980F4B43e9FED',
     *  value: 0,
     *  functionName: 'transfer',
     *  inputs: [
     *   {type: "address", value: "0x80cbb6c4342948e5be81987dce8251dbedd69138"},
     *   {type: "uint256", value: "73680000"}
     *  ]
     * }
     */
    async executeContract(from, to, functionName = 'transfer', address, value) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Launching a transaction */
        const signer = arkaneConnect.createSigner()
        signer
          .executeContract({
            secretType: currentNetwork,
            walletId: from,
            to,
            value: 0,
            functionName,
            inputs: [
              { type: 'address', value: address },
              { type: 'uint256', value },
            ],
          })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Transaction ${signerResult.result.transactionHash} has been successfully executed!`)
              return signerResult.success
            }
            console.warn(`Something went wrong while executing the transaction`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    /** This function transfers gas (ex. ETH / VTHO / GAS / )
     *  from one address to another. The destination can be any
     *  blockchain address, a wallet, or a smart contract, it can
     *  even be an email address.
     */
    async executeGasTransfer(from, to) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Launching a transaction */
        const signer = arkaneConnect.createSigner()
        signer
          .executeGasTransfer({
            walletId: from,
            to,
            value: 18,
            secretType: currentNetwork,
          })
          .then((signerResult) => {
            if (signerResult.success) {
              console.log(`Transaction ${signerResult.result.transactionHash} has been successfully executed!`)
              return signerResult.success
            }
            console.warn(`Something went wrong while executing the transaction`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
      return false
    },
    /** This function returns the status for a specific transaction.
     * Returns UNKNOWN when the specific chain is not supported.
     * {
     *    status: 'UNKNOWN' | 'PENDING' | 'FAILED' | 'SUCCEEDED'
     * }
     */
    async getTransactionStatus(address) {
      let arkaneConnect = null
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
        }
        /* We load Arkane for the network we on */
        const networkSymbol = this.$store.state.account.symbol
        let currentNetwork = ''
        if (networkSymbol === 'BNB') {
          currentNetwork = this.blockchainSecretTypes.BSC
        } else if (networkSymbol === 'ETH') {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        } else if (networkSymbol === 'MATIC') {
          currentNetwork = this.blockchainSecretTypes.MATIC
        } else {
          currentNetwork = this.blockchainSecretTypes.ETHEREUM
        }
        /* Launching a transaction */
        const status = arkaneConnect.api
          .getTransactionStatus('0xe95cfd4c68e4b43f60adb8a97dc10264ad0046518946a768d980ee454e492645', currentNetwork)
          .then((result) => {
            if (result) {
              console.log(`Transaction Status : ${result}`)
              return result
            }
            console.warn(`Something went wrong while executing the transaction`)
            return false
          })
          .catch((error) => {
            console.log('Error signing Arkane transaction :', error)
            return false
          })
        return status
      } catch (error) {
        /* Handle the error */
        console.error(error)
        return false
      }
    },
    async requestPermissions() {
      await window.ethereum
        .request({
          method: 'eth_requestAccounts',
          params: [{ eth_accounts: {} }],
        })
        .then((permissions) => {
          const accountsPermission = permissions.find((permission) => permission.parentCapability === 'eth_accounts')
          if (accountsPermission) {
            console.log('eth_accounts permission successfully requested!')
          }
        })
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Permissions needed to continue.')
          } else {
            console.error(error)
          }
        })
    },
    // async connectArkaneProvider() {
    //   /* Check ArkaneProvider Instance */
    //   const arkaneProvider = await this.$web3.connectArkaneProvider()
    //   console.log('arkaneProvider', arkaneProvider)
    //   if (arkaneProvider) {
    //     console.log('%c ArkaneProvider loaded successfully!', 'background: blue; color: white')
    //   } else {
    //     console.log('%c Please connect arkaneProvider!', 'background: red; color: white')
    //   }
    // },
  },
}
</script>
<style lang="sass">
@import "../assets/sass/theme-variables"

.uku-account-card
  background-color: $white

/* CSS Media Queries */
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .hide-on-bigscreen
    display: none

/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .hide-on-tablet
    display: none

/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none

/* $breakpoint-md: 959px */
@media only screen and (max-width: 959px)
  .hide-on-mobile
    display: none

/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none

/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
</style>
