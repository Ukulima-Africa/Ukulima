<template>
  <q-header class="uku-header" height-hint="100">
    <q-banner v-if="notice" dense inline-actions class="q-pl-lg">
      We are currently still in development, please don't use real money on our contracts!
      <template #action>
        <q-btn flat icon="close" color="white" label="Close" @click="closeNotice(notice)" />
      </template>
    </q-banner>
    <q-toolbar>
      <q-btn flat dense round aria-label="Menu" icon="menu" @click="toggleLeftDrawer(leftDrawerOpen)" />
      <q-avatar class="q-ml-xs">
        <img src="~/assets/images/logo.png" alt="Ukulima Africa" width="100px" />
      </q-avatar>
      <q-toolbar-title shrink>
        <nuxt-link to="/" class="uku-logo-link">
          <span class="uku-logo-text">Ukulima</span>
        </nuxt-link>
      </q-toolbar-title>
      <q-space />
      <!-- Right Menu -->
      <div class="uku-menu row no-wrap items-center">
        <q-btn v-if="account && account.account" color="black" class="q-mr-sm account-balance-button" push>
          <div class="row items-center no-wrap">
            <q-icon
              v-if="account.symbol === 'BNB'"
              left
              :name="`img:${require('@/assets/icons/BNB.svg') ? require('@/assets/icons/BNB.svg') : ''}`"
              size="sm"
            />
            <q-icon
              v-else-if="account.symbol === 'ETH'"
              left
              :name="`img:${require('@/assets/icons/ETH.svg') ? require('@/assets/icons/ETH.svg') : ''}`"
              size="sm"
            />
            <q-icon
              v-else-if="account.symbol === 'MATIC'"
              left
              :name="`img:${require('@/assets/icons/MATIC.svg') ? require('@/assets/icons/MATIC.svg') : ''}`"
              size="xs"
            />
            <div class="text-center">{{ account.balance ? parseFloat(account.balance).toFixed(4) : parseFloat('0.0000').toFixed(4) }}</div>
          </div>
        </q-btn>
        <q-btn v-if="account && account.account" color="black" class="q-mr-sm account-address-button" push>
          <div class="row items-center no-wrap">
            <!-- DEV NOTE: Must add QR code Scanner func here for Wallet address or Import -->
            <q-icon left size="1.1em" name="style" />
            <!-- END DEV NOTE: -->
            <div class="text-center">{{ account.account | truncate(5, '...') }}</div>
          </div>
        </q-btn>
        <q-btn
          v-if="!account.account"
          rounded
          outlined
          no-wrap
          icon-right="play_arrow"
          color="secondary"
          class="q-mr-xs"
          label="Connect"
          @click="connectMetaMask()"
        />
        <q-btn
          v-if="!user || user.uid === null"
          rounded
          outlined
          no-wrap
          icon-right="perm_identity"
          to="/auth/signin"
          class="signin-button uku-desktop-menu q-mr-sm"
          label="SIGN IN"
        />
        <q-btn
          v-if="user && user.uid !== null"
          rounded
          outlined
          no-wrap
          icon-right="logout"
          class="signout-button uku-desktop-menu"
          label="SIGN OUT"
          @click="signOut()"
        />
      </div>
      <!-- END Right Menu -->
      <div class="q-gutter-sm row items-center no-wrap">
        <!-- User Account Dropdown Button -->
        <q-btn v-if="user && user.uid !== null" flat round icon="account_circle" size="1em" class="account-button">
          <q-menu anchor="top end" self="bottom left">
            <q-list class="account-menu">
              <q-item v-if="user.name" v-ripple to="/profile" clickable>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="user.photoUrl ? user.photoUrl : 'https://cdn.quasar.dev/img/boy-avatar.png'" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ user.name }}</q-item-section>
              </q-item>
              <q-item-label v-if="profile.username" header class="text-weight-bold text-uppercase">Arkane Account</q-item-label>
              <q-item v-if="profile.username" v-ripple clickable class="black q-mr-xs">
                <q-item-section> {{ profile.username }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item v-if="profile.email" v-ripple clickable class="black q-mr-xs">
                <q-item-section> {{ profile.email }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item v-ripple to="/dashboard" clickable color="black" class="q-mr-xs">
                <q-item-section avatar>
                  <q-icon color="black" name="dashboard" />
                </q-item-section>
                <q-item-section>Dashboard</q-item-section>
              </q-item>
              <q-item v-ripple to="/company" clickable color="black" class="q-mr-xs">
                <q-item-section avatar>
                  <q-icon color="black" name="store" />
                </q-item-section>
                <q-item-section>Organisation</q-item-section>
              </q-item>
              <q-item v-ripple to="/users" clickable color="black" class="q-mr-xs">
                <q-item-section avatar>
                  <q-icon color="black" name="group" />
                </q-item-section>
                <q-item-section>Users</q-item-section>
              </q-item>
              <q-item v-ripple to="/inventory" clickable color="black" class="q-mr-xs">
                <q-item-section avatar>
                  <q-icon color="black" name="inventory" />
                </q-item-section>
                <q-item-section>Inventory</q-item-section>
              </q-item>
              <q-item v-ripple to="/mygrants" clickable color="black" class="q-mr-xs">
                <q-item-section avatar>
                  <q-icon color="black" name="ballot" />
                </q-item-section>
                <q-item-section>Grants</q-item-section>
              </q-item>
              <q-item v-ripple to="/profile" clickable color="black" class="q-mr-xs">
                <q-item-section avatar>
                  <q-icon color="black" name="account_box" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <!-- END Hide for MVP -->
              <q-separator />
              <q-item v-ripple clickable color="black" class="q-mr-xs" @click="signOut()">
                <q-item-section avatar>
                  <q-icon color="black" name="logout" />
                </q-item-section>
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
/* Enums and Helper */
import { networkFilter } from '../../util/networkFilter'
import { networkColor } from '../../util/networkColor'
import { networkSymbol } from '../../util/networkSymbol'
/* LFG */
export default {
  name: 'Header',
  filters: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      }
      return text
    },
  },
  data() {
    return {
      network: null,
    }
  },
  computed: {
    ...mapState(['notice', 'user', 'account', 'profile', 'leftDrawerOpen']),
    ...mapGetters({
      getNotice: 'notice',
      getUser: 'user',
      getAccount: 'account',
      getProfile: 'profile',
      getLeftDrawerState: 'leftDrawerOpen',
    }),
    notice: {
      get() {
        return this.$store.state.notice
      },
      set(value) {
        this.$store.commit('SET_NOTICE', value)
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
    leftDrawerOpen: {
      get() {
        return this.$store.state.leftDrawerOpen
      },
      set(value) {
        this.$store.commit('SET_LEFTDRAWER', value)
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
    toggleLeftDrawer(value) {
      this.$store.commit('TOGGLE_LEFTDRAWER', value)
    },
    toggleNotice(value) {
      this.$store.commit('TOGGLE_NOTICE', value)
    },
    closeNotice(value) {
      this.$store.commit('TOGGLE_NOTICE', value)
    },
    networkFilter(chainId, filterType) {
      return networkFilter(chainId, filterType)
    },
    async connectMetaMask() {
      /* Check Web3 Instance */
      const newWeb3 = await this.$web3()
      /* Enable MetaMask and Sign in */
      if (newWeb3 && newWeb3.isMetaMask === true) {
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
      const newAccount = await this.$web3.connectMetaMask()
      if (newAccount && newAccount !== '') {
        this.$store.commit('SET_ACCOUNT_ADDRESS', newAccount)
        const chainIdHEX = await this.$web3.getChainId(newAccount)
        this.$store.commit('SET_CHAIN_ID_HEX', chainIdHEX)
        const chainId = networkFilter(chainIdHEX, 'id')
        this.$store.commit('SET_CHAIN_ID', chainId)
        const chainName = networkFilter(chainIdHEX, 'name')
        this.$store.commit('SET_CHAIN_NAME', chainName)
        const chainSymbol = networkSymbol(chainIdHEX, 'symbol')
        this.$store.commit('SET_SYMBOL', chainSymbol)
        const balance = await this.$web3.getBalance(newAccount)
        this.$store.commit('SET_BALANCE', balance)
        return true
      }
      return false
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
@import "../../assets/sass/theme-variables"
.uku-header
  color: $secondary
  background-color: $primary
  border-style: none none solid none
  box-shadow: none !important
  margin: 0
  .q-banner
    font-size: 18px !important
    line-height: 20px
    font-weight: 400
    color: $white
    background-color: $secondary
    text-align: center
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
      background-color: $black
      &:hover,
      &:active
        text-decoration: none !important
    .account-address-button
      background-color: $black !important
      font-size: 13px
      line-height: 26px
      font-weight: 400
      .q-icon
        margin-left: -8px !important
        margin-right: 5px !important
    .account-balance-button
      background-color: $black !important
      font-size: 13px
      line-height: 26px
      font-weight: 400
      .q-icon
        margin-left: -10px !important
        margin-right: 2px !important
.account-button
  color: $black
.account-menu
  min-width: 200px
  a
    color: $black !important
    &:hover, &:focus
      color: $black !important
      text-decoration: none
.signout-button
  color: $white
  background-color: $black
  &:hover,
  &:active
    text-decoration: none !important
/* CSS Media Queries */
@media only screen and (max-width: 5000px)
  .uku-mobile-menu
    display: none
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .uku-mobile-menu
    display: none
  .hide-on-bigscreen
    display: none
/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .uku-mobile-menu
    display: none
  .hide-on-tablet
    display: none
/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .uku-mobile-menu
    display: none
  .hide-on-tablet
    display: none
/* $breakpoint-md: 959px */
@media only screen and (max-width: 959px)
  .uku-mobile-menu
    display: none
  .hide-on-mobile
    display: none
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .uku-desktop-menu
    display: none
  .uku-mobile-menu
    display: inline-block
  .hide-on-mobile
    display: none
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .uku-desktop-menu
    display: none
  .uku-mobile-menu
    display: inline-block
  .hide-on-mobile
    display: none
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .uku-desktop-menu
    display: none
  .uku-mobile-menu
    display: inline-block
  .hide-on-mobile
    display: none
</style>
