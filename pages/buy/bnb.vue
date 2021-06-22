<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="binance-orange-bg">
      <q-page>
        <div class="row uku-row uku-buy-page uku-buy-bg-image">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-buy">
              <div class="row items-center justify-center no-wrap">
                <div class="uku-binance-logo">
                  <img src="~/assets/images/binance.png" alt="Binance" class="binance-logo" width="260px" />
                </div>
              </div>
              <div class="row items-center no-wrap">
                <div class="uku-buy-title">Purchase BNB</div>
              </div>
              <div class="row items-center justify-center no-wrap" align="center">
                <div class="uku-buy-title-text">Connect your MetaMask to continue</div>
              </div>
              <div class="row no-wrap items-center justify-center" align="center">
                <q-form ref="buyForm" class="q-gutter-md uku-form" autocomplete="off" @submit="buyNow" @reset="resetForm">
                  <div class="self-center full-width no-outline">
                    <q-input
                      v-model="token.amount"
                      outlined
                      name="amount"
                      type="text"
                      label="Amount"
                      label-color="grey"
                      placeholder="Amount"
                      color="black"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please enter an amount to continue']"
                      no-error-icon
                      tabindex="1"
                    />
                  </div>
                  <div class="self-center full-width no-outline" tabindex="2">
                    <q-input
                      v-model="token.address"
                      outlined
                      name="address"
                      type="text"
                      label="Account Address"
                      label-color="grey"
                      placeholder="Wallet Address"
                      color="black"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please enter a valid account address to continue']"
                      no-error-icon
                    />
                  </div>
                  <div class="self-center full-width no-outline q-py-xs">
                    <q-checkbox
                      v-model="accept"
                      size="sm"
                      color="black"
                      class="uku-terms"
                      :true-value="true"
                      :false-value="false"
                      :toggle-indeterminate="false"
                      tabindex="3"
                    >
                      <template #default>
                        I accept Ukulima’s
                        <a href="https://ukulima.africa/terms" alt="Terms &amp; Conditions" target="_blank" class="uku-terms-link"
                          >Terms &amp; Conditions</a
                        >&nbsp;and
                        <a href="https://ukulima.africa/privacy" alt="Privacy &amp; Data Policy" target="_blank" class="uku-terms-link"
                          >Privacy Policy</a
                        >
                      </template>
                    </q-checkbox>
                  </div>
                  <div class="self-center full-width no-outline">
                    <q-btn outline rounded class="uku-buy-button" label="Buy BNB Now" type="submit" tabindex="4" />
                  </div>
                  <div class="self-center full-width no-outline">
                    <q-btn outline rounded class="uku-connect-button" label="Connect Metamask" tabindex="4" @click="connectMetaMask()" />
                  </div>
                </q-form>
              </div>
              <div class="row items-center justify-center no-wrap">
                <div class="uku-footer-text">
                  Need more BUSD Coin?
                  <nuxt-link to="/buy/busd" class="uku-footer-link">Buy BUSD Coin ›</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Next Steps Section -->
        <div class="row uku-row uku-next-steps">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-steps">
              <div class="row items-center no-wrap">
                <div class="uku-steps-title">Next steps…</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">1. Connect your Metamask account or crypto wallet</div>
                <div class="uku-steps-text">Let’s get you connected to the Binance Smart Chain and the BSC network</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">2. Enter the amount of tokens you would like to purchase</div>
                <div class="uku-steps-text">All you need is a crypto wallet and some funds to complete your transaction</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">3. Verify your purchase to go to the moon...</div>
                <div class="uku-steps-text">Ukulima offers many different products and services to grow your business</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">4. Start using Ukulima today and let's invest in your future together</div>
                <div class="uku-steps-text">Be sure to checkout our investment &amp; liquidity pools for great APY's on your investments</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-text">For more information please feel free to get in touch with us...</div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Next Steps Section -->
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Arkane Connect for Wallet */
/* Enums and Helper */
// import { networks } from './networks'
import { networkFilter } from '../../util/networkFilter'
import { networkColor } from '../../util/networkColor'
/* Components */
import HeaderLogo from '../../components/general/HeaderLogo.vue'
import Footer from '../../components/general/Footer.vue'
/* LFG */
export default {
  name: 'BuyBNB',
  components: {
    HeaderLogo,
    Footer,
  },
  data() {
    return {
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
  },
  methods: {
    async buyNow() {
      const that = this
      this.loading = true
      /* Ensure form is valid */
      const formValidation = await that.$refs.buyForm.validate().then((outcome) => {
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
<style lang="sass" scoped>
@import "../../assets/sass/theme-variables"
.uku-buy-page
  min-height: inherit
  margin: 0 auto
  padding: 0
// .uku-buy-bg-image
//   background-image: url('~assets/images/binance-bg.png')
//   background-size: contain
//   background-repeat: no-repeat
//   background-position: center center
//   overflow: display
.uku-buy
  width: 549px
  border-radius: 5px
  border: solid 1px #cecece
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
  background-color: #ffffff
  margin: 0
  padding: 30px 20px 10px 20px
  .uku-buy-title
    color: #000000
    font-size: 32px
    line-height: 1.22
    font-weight: bold
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin: 0 auto 15px
  .uku-buy-title-text
    color: #000000
    font-size: 16px
    line-height: 1.88
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin: 0 auto 20px
  .q-field__native,
  select
    color: rgba(0, 0, 0, 0.87) !important
  .q-input,
  .q-field
    max-width: 442px !important
    padding-bottom: 23.6px
  .q-field__label,
  .field-label
    color: #737376
    font-size: 14px
    line-height: 1.71
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: left
    margin-top: 20px
    margin-bottom: 10px
    span.optional-msg
      color: #828689
  .q-field--labeled .q-field__native,
  .q-field--labeled .q-field__prefix,
  .q-field--labeled .q-field__suffix
    line-height: 24px
    padding-top: 10px !important
    padding-bottom: 8px
  .uku-buy-button
    width: 442px
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
    background-color: $binance-orange !important
    cursor: pointer
  .uku-connect-button
    width: 442px
    text-transform: capitalize
    color: #ffffff
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
  .uku-footer-text
    width: 100%
    color: #575d64
    font-size: 14px
    line-height: 1.57
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin: 20px auto 20px
    .uku-footer-link
      color: $black
      font-weight: bold
      text-decoration: none
  .uku-link
    color: $black !important
    font-size: 14px
    font-weight: bold
    line-height: 1.57
    margin-left: 5px
  .uku-terms
    color: $black !important
    font-size: 14px
    line-height: 1.57
    font-weight: normal
    font-stretch: normal
    font-style: normal
  .uku-terms-link
    color: $secondary !important
    font-size: 14px
    line-height: 1.71
    letter-spacing: 0.13px
    font-weight: bold
    font-stretch: normal
    font-style: normal
    cursor: pointer
    z-index: 9999 !important
    &:hover, &::focus
      text-decoration: underline

.uku-next-steps
  min-height: 480px
  margin: 0 auto
  padding: 0
  background-color: none
  .uku-steps
    max-width: 679px
    margin: 0 auto
    padding: 0
    .uku-steps-title
      color: #000000
      font-size: 37px
      line-height: 1.19
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 0 25px
    .uku-steps-heading
      width: 100%
      color: #000000
      font-size: 20px
      line-height: 1.4
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 auto 14px
    .uku-steps-text
      width: 100%
      color: #000000
      font-size: 16px
      line-height: 1.56
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 auto 20px
a
  color: $secondary !important
  &:hover, &:focus
    color: $secondary !important
    text-decoration: none

// $breakpoint-xs: 479px !default
@media only screen and (max-width : 479px)
  .q-page-container
    padding-top: 0 !important
    padding-bottom: 0 !important
    .uku-buy-page
      overflow: hidden
    .uku-buy-bg-image
      background-image: none
    .uku-buy
      width: 90%
      border-radius: 4px
      box-shadow: none !important
      padding: 15px
      margin-top: 100px
      .uku-form
        width: 100%
        margin-left: auto
        margin-right: auto
      .uku-buy-title
        font-size: 34px
        line-height: 1.21
        margin: 0px auto 15px
      .uku-buy-button
        width: 100%
      .uku-connect-button
        width: 100%
    .uku-next-steps
      .uku-steps
        margin-left: 15px

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-page-container
    padding-top: 0 !important
    padding-bottom: 0 !important
  .uku-buy-page
    overflow: hidden
  .uku-buy-bg-image
    background-image: none
  .uku-buy
    width: 90%
    border-radius: 4px
    box-shadow: none !important
    padding: 15px
    .uku-form
      width: 100%
      margin-left: auto
      margin-right: auto
    .uku-buy-title
      font-size: 34px
      line-height: 1.21
      margin: 40px auto 34px
    .uku-buy-button
      width: 100%
    .uku-connect-button
      width: 100%
</style>
