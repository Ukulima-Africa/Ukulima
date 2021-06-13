<template>
  <q-layout view="hHh lpR fFf" class="background-beige">
    <Header />
    <SidebarLeft />
    <q-page-container>
      <!-- First Row - Intro & Connect -->
      <div class="row items-start justify-evenly uku-blue-bg">
        <div class="col-8 col-lg-7 col-md-12 col-sm-12 col-xs-12 intro-bg-image">
          <Intro />
        </div>
        <div class="col-4 col-lg-5 col-md-12 col-sm-12 col-xs-12">
          <Signin />
        </div>
      </div>
      <!-- END First Row -->
      <!-- Second Row - Intro & Connect -->
      <div class="row items-start justify-evenly">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 blue-green-bg-image">
          <Blockchain />
        </div>
      </div>
      <!-- END Second Row -->
      <!-- Third Row - Intro & Connect -->
      <div class="row items-start justify-evenly uku-green-bg">
        <div class="col-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <Defi />
        </div>
        <div class="col-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <Invest />
        </div>
        <div class="col-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <Insurance />
        </div>
      </div>
      <!-- END Third Row -->
      <!-- Fourth Row - Intro & Connect -->
      <div class="row items-start justify-evenly">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Binance />
        </div>
      </div>
      <!-- END Fourth Row -->
      <!-- Fourth Row - Intro & Connect -->
      <div class="row items-start justify-evenly">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <BlockchainPower />
        </div>
      </div>
      <!-- END Fourth Row -->
      <!-- Fifth Row -->
      <div class="row items-start justify-evenly uku-blue-bg">
        <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <Banner />
        </div>
        <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <About />
        </div>
      </div>
      <!-- END Fifth Row -->
      <!-- Sixth Row -->
      <div class="row items-start justify-evenly stripe-bg-image">
        <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <News />
        </div>
        <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <Contact />
        </div>
      </div>
      <!-- END Sixth Row -->
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
import Intro from '../components/Intro.vue'
import Signin from '../components/Signin.vue'
import Banner from '../components/Banner.vue'
import About from '../components/About.vue'
import Blockchain from '../components/Blockchain.vue'
import BlockchainPower from '../components/BlockchainPower.vue'
import Defi from '../components/Defi.vue'
import Binance from '../components/Binance.vue'
import Insurance from '../components/Insurance.vue'
import Invest from '../components/Invest.vue'
import Contact from '../components/Contact.vue'
import News from '../components/News.vue'
/* LFG */
export default {
  name: 'Dashboard',
  components: {
    Header,
    SidebarLeft,
    Intro,
    Signin,
    Banner,
    About,
    Blockchain,
    BlockchainPower,
    Defi,
    Binance,
    Insurance,
    Invest,
    Contact,
    News,
  },
  data() {
    return {
      title: 'Ukulima Africa',
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
    ...mapState(['web3', 'account', 'user', 'profile', 'company']),
    ...mapGetters({
      getWeb3: 'getWeb3',
      getAccount: 'getAccount',
      getUser: 'getUser',
      getProfile: 'getProfile',
      getChainIdHEX: 'getChainIdHEX',
    }),
    web3: {
      get() {
        return this.$store.state.web3
      },
      set(value) {
        this.$store.commit('SET_WEB3', value)
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
    user: {
      get() {
        return this.$store.state.user
      },
      set(value) {
        this.$store.commit('SET_USER', value)
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
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Your account was not loaded correctly, please refresh your browser and try again!',
        actions: [
          {
            label: 'Try again!',
            color: 'white',
            handler: () => {
              this.loadAccount()
            },
          },
        ],
      })
      return false
    },
  },
}
</script>
<style lang="sass" scoped>
.intro-bg-image
  background-image: url('../assets/images/intro-graphic.jpg')
  background-size: cover
  background-repeat: no-repeat
  background-position: center center
  overflow: hidden
  padding: 0
.blue-green-bg-image
  background-image: url('../assets/images/blue-green-bg.png')
  background-size: cover
  background-repeat: no-repeat
  background-position: top left
  overflow: hidden
  padding: 0
.stripe-bg-image
  background-image: url('../assets/images/stripe-bg.png')
  background-size: 100%
  background-repeat: no-repeat
  background-position: center right
  overflow: hidden
  padding: 0

// $breakpoint-md: 959px !default
@media only screen and (max-width: 959px)
  .hide-on-tablet
    display: none

// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .hide-on-tablet
    display: none

// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
</style>
