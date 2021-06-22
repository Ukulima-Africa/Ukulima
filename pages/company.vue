<template>
  <q-layout view="hHh lpR fFf" class="background-beige">
    <Header />
    <SidebarLeft />
    <q-page-container>
      <CompanyForm :user="user" />
    </q-page-container>
  </q-layout>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Enums and Network Helper */
import { networkFilter } from '../util/networkFilter'
/* Components */
import Header from '../components/general/Header.vue'
import SidebarLeft from '../components/SidebarLeft.vue'
import CompanyForm from '../components/forms/CompanyForm.vue'
/* LFG */
export default {
  name: 'Company',
  components: {
    Header,
    SidebarLeft,
    CompanyForm,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user', 'account', 'profile', 'company']),
    ...mapGetters({
      getUser: 'user',
      getAccount: 'account',
      getProfile: 'profile',
      getCompany: 'company',
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
    company: {
      get() {
        return this.$store.state.company
      },
      set(value) {
        this.$store.commit('SET_COMPANY', value)
      },
    },
  },
  async beforeCreate() {
    /* Check Web3 Instance */
    const newWeb3 = await this.$web3()
    if (newWeb3) {
      this.$store.commit('SET_WEB3_INSTANCE', true)
      if (newWeb3 && newWeb3.isMetaMask === true) {
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      /* Open the sidebar for this screen */
      this.$store.commit('SET_LEFTDRAWER', true)
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  },
  methods: {
    async loadAccount() {
      /* Load Account, Chain Info and Balance/s */
      const newAccount = await this.$web3.getAccount()
      if (newAccount && newAccount !== '') {
        this.$store.commit('SET_ACCOUNT_ADDRESS', newAccount)
        const chainIdHEX = await this.$web3.getChainId(newAccount)
        this.$store.commit('SET_CHAIN_ID_HEX', chainIdHEX)
        const chainId = networkFilter(chainIdHEX, 'id')
        this.$store.commit('SET_CHAIN_ID', chainId)
        const chainName = networkFilter(chainIdHEX, 'name')
        this.$store.commit('SET_CHAIN_NAME', chainName)
        const balance = await this.$web3.getBalance(newAccount)
        this.$store.commit('SET_BALANCE', balance)
        return true
      }
      return false
    },
  },
}
</script>
