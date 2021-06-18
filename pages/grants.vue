<template>
  <q-layout view="hHh lpR fFf" class="background-beige">
    <Header />
    <SidebarLeft />
    <q-page-container>
      <GrantsList />
    </q-page-container>
  </q-layout>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Enums and Network Helper */
import { networkFilter } from '../util/networkFilter'
/* Components */
import Header from '../components/Header.vue'
import SidebarLeft from '../components/SidebarLeft.vue'
import GrantsList from '../components/GrantsList.vue'
/* LFG */
export default {
  name: 'Grants',
  components: {
    Header,
    SidebarLeft,
    GrantsList,
  },
  data() {
    return {
      title: 'Grants - Ukulima Africa',
      description:
        'Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure smallhold farmers throughout Africa',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [{ hid: 'description', name: 'description', content: this.description }],
    }
  },
  computed: {
    ...mapState(['web3', 'account', 'user', 'leftDrawerOpen']),
    ...mapGetters({
      getWeb3: 'web3',
      getAccount: 'account',
      getUser: 'user',
      getLeftDrawerState: 'leftDrawerOpen',
    }),
  },
  async beforeCreate() {
    /* Check Web3 Instance */
    const web3 = await this.$web3()
    if (web3) {
      this.$store.commit('SET_WEB3', web3)
      this.$store.commit('SET_WEB3_INSTANCE', true)
      if (web3 && web3.isMetaMask === true) {
        this.$store.commit('SET_IS_METAMASK', true)
      }
      /* Load User Account Info into the store */
      const accountLoaded = await this.loadAccount()
      if (accountLoaded) {
        console.log('%c MetaMask loaded successfully!', 'background: green; color: white')
      } else {
        console.log('%c Please connect MetaMask!', 'background: red; color: white')
      }
    }
  },
  mounted() {
    /* Open the sidebar for this screen */
    this.$store.commit('SET_LEFTDRAWER', true)
  },
  methods: {
    async loadAccount() {
      /* Load Account, Chain Info and Balance/s */
      const account = await this.$web3.getAccount()
      if (account[0] && account[0] !== '') {
        this.$store.commit('SET_ACCOUNT_ADDRESS', account)
        const chainIdHEX = await this.$web3.getChainId(account)
        this.$store.commit('SET_CHAIN_ID_HEX', chainIdHEX)
        const chainId = networkFilter(chainIdHEX, 'id')
        this.$store.commit('SET_CHAIN_ID', chainId)
        const chainName = networkFilter(chainIdHEX, 'name')
        this.$store.commit('SET_CHAIN_NAME', chainName)
        const balance = await this.$web3.getBalance(account)
        this.$store.commit('SET_BALANCE', balance)
        return true
      }
      return false
    },
  },
}
</script>
