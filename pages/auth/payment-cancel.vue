<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="uku-green-bg">
      <q-page>
        <div class="row uku-row uku-payment-cancelled-page">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="payment-cancelled-greeting" align="center">Your payment was cancelled</div>
            <div class="payment-cancelled-text" align="center">
              Please confirm your payment details to continue...
              <br />
              Try again?
              <nuxt-link to="/auth/payment" class="black uku-link">Make Payment</nuxt-link>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script>
import HeaderLogo from '../../components/general/HeaderLogo.vue'
import Footer from '../../components/general/Footer.vue'
/* LFG */
export default {
  name: 'PaymentCancelled',
  components: {
    HeaderLogo,
    Footer,
  },
}
</script>
<style lang="sass" scoped>
.uku-email-confirmation-page-bg-image
  background-image: url('~assets/images/brush@2x.png')
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  overflow: display
.uku-payment-cancelled-page
  min-height: inherit
  margin: 0 auto
  padding: 0
  .payment-cancelled-icon
    margin: -60px 0 10px 0
  .payment-cancelled-greeting
    color: #333333
    font-size: 36px
    line-height: 1.22
    font-weight: bold
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin-bottom: 10px
  .payment-cancelled-text
    color: #333333
    font-size: 16px
    line-height: 1.56
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
  .uku-link
    color: $black
    font-size: 16px
    font-weight: bold
    line-height: 1.56
    margin-left: 2px

// $breakpoint-xs: 479px !default
@media only screen and (max-width : 479px)
  .uku-payment-cancelled-page
    min-height: 540px
    overflow: hidden
    .payment-cancelled-greeting
      padding: 0
      font-size: 30px
      line-height: 1.18
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-page-container
    padding-top: 90px !important
    padding-bottom: 0 !important
  .uku-payment-cancelled-page
    overflow: hidden
    .payment-cancelled-greeting
      padding: 0 2px
      font-size: 28px
      line-height: 1.18
</style>
