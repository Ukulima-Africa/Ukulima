<template>
  <div class="row uku-buyin items-center justify-center content-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 items-center justify-center self-center uku-buyin-col" align="center">
      <div class="uku-buyin-form">
        <div class="row no-wrap">
          <div class="uku-buyin-title">{{ title }}</div>
        </div>
        <div class="row items-center justify-center no-wrap" align="center">
          <div class="uku-buyin-subtitle">Connect your MetaMask to continue</div>
        </div>
        <div class="row no-wrap items-center justify-center" align="center">
          <q-form ref="buyTokenForm" class="q-gutter-md uku-form" autocomplete="off" @submit="buyNow" @reset="resetForm">
            <div class="self-center full-width no-outline">
              <q-input
                v-model="token.amount"
                outlined
                name="amount"
                type="number"
                label="Amount"
                color="black"
                label-color="grey"
                bg-color="white"
                placeholder="Total Amount"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter your email address to continue!']"
                no-error-icon
                tabindex="1"
              />
            </div>
            <div class="self-center full-width no-outline">
              <q-input
                v-model="token.address"
                outlined
                name="address"
                type="text"
                label="Account Address"
                color="black"
                label-color="grey"
                bg-color="white"
                placeholder="Wallet Address"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter a valid account address to continue']"
                no-error-icon
                tabindex="2"
              />
            </div>
            <div class="self-center full-width no-outline">
              <q-btn outline rounded class="uku-buy-button" label="Buy AGRI Tokens" type="submit" tabindex="4" />
            </div>
            <div v-if="!account.account" class="self-center full-width no-outline">
              <q-btn rounded class="uku-connect-button" label="Connect Metamask" tabindex="5" @click="connectMetaMask()" />
            </div>
            <div v-else class="self-center full-width no-outline">
              <q-btn rounded class="uku-stake-button" label="Stake AGRI" tabindex="5" />
            </div>
          </q-form>
        </div>
        <div class="row items-center justify-center no-wrap">
          <div class="uku-footer-text">
            Need more BNB Tokens?
            <nuxt-link to="/buy/bnb" class="uku-footer-link">Buy BNB Tokens ›</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Enums and Helper */
// import { networks } from './networks'
import { networkFilter } from '../../util/networkFilter'
import { networkColor } from '../../util/networkColor'
import { networkSymbol } from '../../util/networkSymbol'
/* LFG */
export default {
  name: 'BuyTokensForm',
  data() {
    return {
      title: 'Purchase AGRI Tokens',
      loading: false,
      showEmailNotice: false,
      token: {
        amount: 0.0,
        address: '',
      },
      accept: false,
    }
  },
  computed: {
    ...mapState(['user', 'account', 'profile']),
    ...mapGetters({
      getUser: 'getUser',
      getAccount: 'getAccount',
      getProfile: 'getProfile',
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
    networkColor() {
      return networkColor(this.$store.state.account.chainIdHEX, 'color')
    },
    networkIcon() {
      return networkColor(this.$store.state.account.chainIdHEX, 'icon')
    },
    networkSymbol() {
      return networkSymbol(this.$store.state.account.chainIdHEX, 'symbol')
    },
  },
  methods: {
    async buyNow() {
      const that = this
      this.loading = true
      /* Ensure form is valid */
      const formValidation = await that.$refs.buyTokenForm.validate().then((outcome) => {
        return outcome
      })
      if (formValidation === true) {
        if (that.accept !== true) {
          that.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Kindly read and accept our Terms & Conditions to continue',
          })
        } else {
          // sign up user using firebase auth
          // $nuxt.$fire.auth
          //   .createUserWithEmailAndPassword(that.buy.email, that.buy.password)
          //   .then(async (userCredential) => {
          //     // we store this users name and email in our firestore database.
          //     try {
          //       await $nuxt.$fire.firestore.collection('users').doc($nuxt.$fire.auth.currentUser.uid).set(
          //         {
          //           name: that.buy.name,
          //           email: that.buy.email,
          //         },
          //         { merge: true },
          //       )
          //     } catch (error) {
          //       const errorCode = error.code
          //       const errorMessage = error.message
          //       that.$q.notify({
          //         color: 'red-6',
          //         textColor: 'white',
          //         icon: 'warning',
          //         message: `Error details Account: ${errorCode} : ${errorMessage}`,
          //       })
          //     }
          //     /* Reset form */
          //     try {
          //       that.$refs.buyForm.resetValidation()
          //       that.$refs.buyForm.reset()
          //     } catch (err) {}
          //     /* Require first time users to verify their email. */
          //     await $nuxt.$fire.auth.currentUser.sendEmailVerification()
          //     // we sign out this newly created user to do email verification first.
          //     $nuxt.$fire.auth.signOut()
          //     $nuxt.$router.push('/auth/email-confirmation')
          //     // show success message
          //   })
          //   .catch((error) => {
          //     const errorCode = error.code
          //     console.error('errorCode', errorCode)
          //     const errorMessage = error.message
          //     // show notification that something went wrong maybe ?
          //     console.error('errorMessage', errorMessage)
          //     that.$q.notify({
          //       color: 'red-6',
          //       textColor: 'white',
          //       icon: 'warning',
          //       message: `Error creating new user account: ${errorMessage}`,
          //     })
          //   })
        }
        this.$refs.buyTokenForm.resetValidation()
        this.$refs.buyTokenForm.reset()
        this.loading = false
      }
    },
    resetForm() {
      this.isValid = false
      this.accept = false
      this.token.amount = 0.0
      this.token.address = ''
      this.$refs.buyTokenForm.resetValidation()
      this.$refs.buyTokenForm.reset()
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
        const balance = await this.$web3.getBalance(newAccount)
        this.$store.commit('SET_BALANCE', balance)
        return true
      }
      return false
    },
    networkFilter(chainId, filterType) {
      return networkFilter(chainId, filterType)
    },
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-buyin
  max-height: 600px
  min-height: inherit
  margin: 0 auto
  padding: 0
  overflow: hidden
  .uku-buyin-col
    padding: 60px 15px 30px
    .uku-buyin-form
      max-width: 469px
      border-radius: 4px
      border: solid 2px $black
      padding: 40px 30px
      .uku-buyin-title
        width: 100%
        color: $black
        font-size: 28px
        line-height: 30px
        font-weight: 400
        letter-spacing 0.10px
        word-spacing 1px
        text-decoration: underline
        margin: 0 auto 10px
      .uku-buyin-subtitle
        width: 100%
        color: $black
        font-size: 16px
        line-height: 20px
        font-weight: 400
        letter-spacing 0.8px
        margin: 0 auto 20px
      .uku-form
        max-width: 360px
        .q-field__native, .q-field__input
          color: $black !important
          width: 100%
        .q-field--outlined
          .q-field__control
            &:before
              border: 1px solid $black !important
            &:hover:before
              border-color: $black
            &:after
              height: inherit
              border-radius: inherit
              border: 2px solid transparent
        .uku-buy-button
          width: 340px
          text-transform: capitalize
          color: $black
          font-size: 18px
          font-weight: 500
          font-stretch: normal
          font-style: normal
          line-height: 1.17
          letter-spacing: normal
          text-align: center
          border-radius: 5px
          background-color: $white !important
          cursor: pointer
        .uku-connect-button
          width: 340px
          text-transform: capitalize
          color: $white
          font-size: 18px
          font-weight: 500
          font-stretch: normal
          font-style: normal
          line-height: 1.17
          letter-spacing: normal
          text-align: center
          border-radius: 5px
          border-color: $black
          background-color: $secondary !important
          cursor: pointer
          margin: 10px 0 0 0
        .uku-stake-button
          width: 340px
          text-transform: capitalize
          color: $white
          font-size: 18px
          font-weight: 500
          font-stretch: normal
          font-style: normal
          line-height: 1.17
          letter-spacing: normal
          text-align: center
          border-radius: 5px
          background-color: $secondary !important
          cursor: pointer
          margin: 10px 0 0 0
      .uku-footer-text
        width: 100%
        color: #000000
        font-size: 14px
        line-height: 1.57
        font-weight: normal
        font-stretch: normal
        font-style: normal
        letter-spacing: normal
        text-align: center
        margin: 20px 0 0 0
        .uku-footer-link
          color: $black
          font-weight: bold
          text-decoration: none
  /* CSS Media Queries */
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none
  .uku-buyin-col
    margin: 0 auto
    padding: 30px 20px
    .uku-buyin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 25px 15px
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-buyin-col
    margin: 0 auto
    padding: 0
    .uku-buyin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 25px 15px
      .uku-form
        padding: 25px 10px
        .uku-buy-button
          width: 340px
        .uku-connect-button
          width: 340px
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-buyin-col
    margin: 0 auto
    padding: 0
    .uku-buyin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 0
      .uku-form
        padding: 25px 10px
        .uku-buy-button
          width: 100%
        .uku-connect-button
          width: 100%
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-buyin-col
    margin: 0 auto
    padding: 20px 15px !important
    .uku-buyin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 0
      .uku-form
        padding: 25px 10px
        .uku-buy-button
          width: 100%
        .uku-connect-button
          width: 100%
</style>
