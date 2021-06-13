<template>
  <q-header class="uku-header" height-hint="80">
    <q-toolbar>
      <q-btn v-if="user.uid" flat dense round aria-label="Menu" icon="menu" @click="toggleLeftDrawer(leftDrawerOpen)" />
      <q-avatar class="q-ml-xs">
        <img src="~/assets/images/logo.png" alt="Ukulima Africa" width="100px" />
      </q-avatar>
      <q-toolbar-title shrink>
        <nuxt-link to="/" class="uku-logo-link">
          <span class="uku-logo-text">Ukulima</span>
        </nuxt-link>
      </q-toolbar-title>
      <!-- Left Menu -->
      <div class="uku-menu uku-desktop-menu row no-wrap items-center q-ml-md">
        <NuxtLink to="/" class="uku-menu-item">Home</NuxtLink>
        <NuxtLink to="/grants" class="uku-menu-item">Grants</NuxtLink>
        <NuxtLink to="/sponsors" class="uku-menu-item">Sponsors</NuxtLink>
        <NuxtLink to="/marketplace" class="uku-menu-item">Marketplace</NuxtLink>
        <NuxtLink to="/nfts" class="uku-menu-item">NFTs</NuxtLink>
        <QSeparator inset vertical class="menu-item-separator self-center"></QSeparator>
        <!-- <NuxtLink to="/auth/signup" class="uku-menu-item">Sign Up</NuxtLink> -->
        <NuxtLink v-if="user.uid" to="/dashboard" class="uku-menu-item">Dashboard</NuxtLink>
      </div>
      <!-- End Menu -->
      <q-space />
      <!-- Search -->
      <!-- <div class="YL__toolbar-input-container row no-wrap">
        <q-input v-model="searchText" dense square color="black" standout="bg-white" bg-color="white" class="GPL__toolbar-input" placeholder="Search">
          <template #prepend>
            <q-icon v-if="searchText === ''" name="search" />
          </template>
          <template #append>
            <q-icon v-if="searchText !== ''" name="clear" class="cursor-pointer" @click="search('')" />
          </template>
        </q-input>
      </div> -->
      <!-- <q-space /> -->
      <!-- END Search -->
      <!-- Right Menu -->
      <div class="uku-menu uku-desktop-menu row no-wrap items-center">
        <div v-if="account.balance" class="account-balance-button"><q-icon name="money" /> {{ parseFloat(account.balance) }}</div>
        <div v-if="account.account" class="account-address-button"><q-icon name="style" /> {{ account.account[0] }}</div>
        <NuxtLink v-if="!user.uid" to="/auth/signin" class="signin-button">SIGN IN</NuxtLink>
        <NuxtLink v-if="user.uid" to="/logout" class="signout-button">SIGN OUT</NuxtLink>
        <q-btn v-if="!account.account" rounded outlined color="secondary" label="Connect" @click="connectMetaMask()" />
      </div>
      <!-- END Right Menu -->
      <div class="q-gutter-sm row items-center no-wrap">
        <!-- <q-btn
          v-if="!profile.isAuthenticated"
          dense
          outline
          :color="!user.account ? 'white' : 'white'"
          :label="!user.account ? 'Connect' : 'Load Arkane'"
          :class="!user.account ? 'arkane-button bg-primary' : 'arkane-button text-black bg-primary'"
          :icon="!user.account ? 'play_arrow' : 'gamepad'"
          @click="!user.account ? connectMetaMask() : connectArkane()"
        /> -->
        <!-- User Account Dropdown Button -->
        <q-btn v-if="user.uid" flat round icon="account_circle" size="21.5px" class="account-button">
          <q-menu anchor="top end" self="bottom left">
            <q-list class="account-menu">
              <q-item v-if="user.name" v-ripple clickable>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ user.name }}</q-item-section>
              </q-item>
              <q-item v-if="profile.username" v-ripple clickable class="black q-mr-xs">
                <q-item-section> {{ profile.username }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item v-if="profile.email" v-ripple clickable class="black q-mr-xs">
                <q-item-section> {{ profile.email }}</q-item-section>
              </q-item>
              <q-separator />
              <nuxt-link to="/profile">
                <q-item v-ripple clickable color="black" class="q-mr-xs">
                  <q-item-section>Profile</q-item-section>
                </q-item>
              </nuxt-link>
              <nuxt-link to="/company">
                <q-item v-ripple clickable color="black" class="q-mr-xs">
                  <q-item-section>Organisation</q-item-section>
                </q-item>
              </nuxt-link>
              <nuxt-link to="/inventory">
                <q-item v-ripple clickable color="black" class="q-mr-xs">
                  <q-item-section>Inventory</q-item-section>
                </q-item>
              </nuxt-link>
              <!-- END Hide for MVP -->
              <q-separator />
              <q-item v-ripple clickable color="black" class="q-mr-xs" @click="signOut()">
                <q-item-section>Sign Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- END User Account Dropdown Button -->
        <!-- Network Button -->
        <q-btn v-if="account.chainIdHEX" round dense flat :color="networkColor" :icon="networkIcon">
          <q-tooltip :content-class="`bg-${networkColor}`">{{ account.chainName }}</q-tooltip>
        </q-btn>
        <!-- END Network Button -->
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Arkane Connect for Wallet */
import { ArkaneConnect } from '../node_modules/@arkane-network/arkane-connect'
/* Enums and Helper */
// import { networks } from './networks'
import { networkFilter } from '../util/networkFilter'
import { networkColor } from '../util/networkColor'
/* LFG */
export default {
  name: 'Header',
  data() {
    return {
      network: null,
    }
  },
  computed: {
    ...mapState(['web3', 'account', 'user', 'profile', 'searchText', 'leftDrawerOpen']),
    ...mapGetters({
      getWeb3: 'getWeb3',
      getAccount: 'getAccount',
      getUser: 'getUser',
      getProfile: 'getProfile',
      getSearchText: 'searchText',
      getLeftDrawerState: 'leftDrawerOpen',
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
    searchText: {
      get() {
        return this.$store.state.searchText
      },
      set(value) {
        this.$store.commit('SET_SEARCH', value)
      },
    },
    leftDrawerOpen: {
      get() {
        return this.$store.state.leftDrawerOpen
      },
      set(value) {
        this.$store.commit('TOGGLE_LEFTDRAWER', value)
      },
    },
    networkColor() {
      return networkColor(this.$store.state.account.chainIdHEX, 'color')
    },
    networkIcon() {
      return networkColor(this.$store.state.account.chainIdHEX, 'icon')
    },
  },
  // async beforeCreate() {
  //   /* Check ArkaneProvider Instance */
  //   const arkaneProvider = await this.$web3.connectArkaneProvider()
  //   if (arkaneProvider) {
  //     console.log('%c ArkaneProvider loaded successfully!', 'background: blue; color: white')
  //   } else {
  //     console.log('%c Please connect arkaneProvider!', 'background: red; color: white')
  //   }
  // },
  methods: {
    search(value) {
      this.$store.commit('SEARCH', value)
    },
    toggleLeftDrawer(value) {
      this.$store.commit('TOGGLE_LEFTDRAWER', value)
    },
    networkFilter(chainId, filterType) {
      return networkFilter(chainId, filterType)
    },
    async connectMetaMask() {
      /* Check Web3 Instance */
      const web3 = await this.$web3()
      this.$store.commit('SET_WEB3', web3)
      /* Enable MetaMask and Sign in */
      if (web3 && web3.isMetaMask === true) {
        this.$store.commit('SET_IS_METAMASK', true)
      }
      /* Load User Account Info into the store */
      const accountLoaded = await this.loadAccount()
      if (accountLoaded) {
        console.log('%c MetaMask connected successfully!', 'background: blue; color: white')
      } else {
        console.log('%c Please connect MetaMask!', 'background: red; color: white')
      }
    },
    async loadAccount() {
      /* Load Network, Account and Balance/s */
      const account = await this.$web3.connectMetaMask()
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
    async connectArkane() {
      try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
          /* Use staging environment on ArkaneConnect */
          const arkaneConnect = new ArkaneConnect(process.env.APP_NAME, {
            environment: 'staging',
          })
          const authArkaneAccount = await this.authArkaneAccount(arkaneConnect)
          console.log('authArkaneAccount:', authArkaneAccount)
          if (authArkaneAccount.isAuthenticated) {
            this.$store.commit('SET_PROFILE_ISAUTHENTICATED', true)
            const arkaneProfile = await this.getArkaneProfile(arkaneConnect)
            console.log('arkaneProfile:', arkaneProfile)
            this.$store.commit('SET_PROFILE', arkaneProfile)
          }
        } else {
          /* Use Mainnet environment on ArkaneConnect */
          const arkaneConnect = new ArkaneConnect(process.env.APP_NAME)
          const authArkaneAccount = await this.authArkaneAccount(arkaneConnect)
          console.log('authArkaneAccount:', authArkaneAccount)
          if (authArkaneAccount.isAuthenticated) {
            this.$store.commit('SET_PROFILE_ISAUTHENTICATED', true)
            const arkaneProfile = await this.getArkaneProfile(arkaneConnect)
            console.log('arkaneProfile:', arkaneProfile)
            this.$store.commit('SET_PROFILE', arkaneProfile)
          }
        }
      } catch (error) {
        // Handle the error
        console.error(error)
      }
    },
    async authArkaneAccount(arkaneConnect) {
      /* Check if a user is authenticated with Arkane */
      const authenticationInstance = await arkaneConnect.checkAuthenticated().then((result) =>
        result
          .authenticated((auth) => {
            console.log(`The user is authenticated: ${auth.subject}`)
          })
          .notAuthenticated((auth) => {
            console.log(`The user is NOT authenticated: ${auth}`)
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
      const arkaneProfile = await arkaneConnect.api.getProfile()
      //   "userId": "46c87fcb-77ed-4433-a425-814569ca1672",
      //   "hasMasterPin": true,
      //   "username": "karel.striegel@arkane.network",
      //   "email": "karel.striegel@arkane.network",
      //   "firstName": "Karel",
      //   "lastName": "Striegel"
      // }
      const arkaneAccount = await arkaneConnect.flows.getAccount('ETHEREUM').then((account) => {
        console.log('User name:', account.auth.tokenParsed.name)
        console.log('User email:', account.auth.tokenParsed.email)
        console.log(`%c Account Wallets : ${JSON.stringify(account.wallets, null, 4)}`, 'background: #222; color: #bada55')
        console.log('First wallet address:', account.wallets[0].address)
        console.log('First wallet balance:', account.wallets[0].balance.balance)
        console.log('2nd wallet address:', account.wallets[1].address)
        console.log('2nd wallet balance:', account.wallets[1].balance.balance)
        console.log('3rd wallet address:', account.wallets[2].address)
        console.log('3rd wallet balance:', account.wallets[2].balance.balance)
      })
      console.log(`%c Console.log like a Boss : ${JSON.stringify(arkaneAccount, null, 4)}`, 'background: #222; color: #bada55')
      return arkaneProfile
    },
    signOut() {
      this.$fire.auth.signOut()
      this.$store.commit('RESET_USER')
      this.$store.commit('RESET_PROFILE')
      this.$store.commit('RESET_PROFILE_TYPE', 'Guest')
      $nuxt.$router.push('/')
    },
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"

.uku-header
  color: $secondary
  background-color: $primary
  /* top | right | bottom | left */
  border-style: none none solid none
  box-shadow: none !important
  margin: 0
  .uku-logo-link
    &:hover, &:focus
      text-decoration: none
      cursor: pointer
  .uku-logo-text
    color: $black
    font-size: 26px
    line-height: 30px
    font-weight: 500
    margin-bottom: -20px
  .uku-menu
    height: 100%
    color: $black
    font-size: 18px
    font-weight: 500
    font-stretch: normal
    font-style: normal
    line-height: 1.19
    .uku-menu-item
      color: $black
      margin: 0 20px
      text-transform: capitalize
      border: none
      box-shadow: none
      &:hover,
      &:active
        color: #343434
        text-decoration: none
    .menu-item-separator
      width: 1px
      height: 30px
      color: #343434
      margin: 0 10px
      border: none
      box-shadow: none
    .signin-button
      color: $white
      background-color: $secondary
      font-size: 14px
      line-height: 26px
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      text-transform: none
      border-radius: 28px
      padding: 5px 20px
      &:hover,
      &:active
        color: $light-grey
        text-decoration: none !important
    .signout-button
      color: $white
      background-color: $black
      font-size: 14px
      line-height: 26px
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      text-transform: none
      border-radius: 28px
      padding: 5px 20px
      &:hover,
      &:active
        color: $light-grey
        text-decoration: none !important
    .signup-grey-button
      color: #333333
      background-color: $light-grey
      font-size: 12px
      line-height: 26px
      font-weight: 300
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      border-radius: 28px
      margin: 0 10px 0 10px
      padding: 6px 20px
      text-decoration: none
      &:visited,
      &:hover,
      &:active
        color: #343434
        text-decoration: none
    .account-address-button
      color: #ffffff
      background-color: $black
      font-size: 12px
      line-height: 26px
      font-weight: 400
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      border-radius: 28px
      margin: 0 10px 0 0
      padding: 5px 20px
      text-decoration: none
      text-overflow: ellipsis
      &:visited,
      &:hover,
      &:active
        color: #ffffff
        text-decoration: none
    .account-balance-button
      color: #ffffff
      background-color: $black
      font-size: 12px
      line-height: 26px
      font-weight: 400
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      border-radius: 28px
      margin: 0 10px 0 0
      padding: 5px 20px
      text-decoration: none
      &:visited,
      &:hover,
      &:active
        color: #ffffff
        text-decoration: none
.account-button
  color: $black
.account-menu
  min-width: 200px
  a
    color: $secondary !important
    &:hover, &:focus
      color: $secondary !important
      text-decoration: none

  .GPL__toolbar-input
    color: $primary

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
