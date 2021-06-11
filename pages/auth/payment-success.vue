<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="white-bg">
      <q-page>
        <div class="row uku-row uku-payment-confirmation-page uku-email-confirmation-page-bg-image">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="payment-confirmation-icon self-center" align="center">
              <img src="~static/tick.svg" alt="Email Verified" class="verified-img" />
            </div>
            <div class="payment-confirmation-greeting" align="center">Great, your payment was successful</div>
            <div class="payment-confirmation-text" align="center">We've sent your invoice to {{ email ? email : 'your email' }}</div>
            <div class="payment-confirmation-text" align="center">
              Ready to continue?
              <nuxt-link to="/" class="black uku-link">Let's go</nuxt-link>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script>
import HeaderLogo from '../../components/HeaderLogo.vue'
import Footer from '../../components/Footer.vue'
/* LFG */
export default {
  name: 'PaymentSuccess',
  components: {
    HeaderLogo,
    Footer,
  },
  data() {
    return {
      email: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    /* Check if there is an email on offer in our URL as param */
    const { email } = this.$route.params
    if (email) {
      this.email = email
    }
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
.uku-payment-confirmation-page
  min-height: inherit
  margin: 0 auto
  padding: 0
  .payment-confirmation-icon
    margin: -60px 0 10px 0
  .payment-confirmation-greeting
    color: #333333
    font-size: 36px
    line-height: 1.22
    font-weight: bold
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin-bottom: 10px
  .payment-confirmation-text
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
  .uku-payment-confirmation-page
    min-height: 540px
    overflow: hidden
    .payment-confirmation-greeting
      padding: 0
      font-size: 30px
      line-height: 1.18
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-page-container
    padding-top: 90px !important
    padding-bottom: 0 !important
  .uku-payment-confirmation-page
    overflow: hidden
    .payment-confirmation-greeting
      padding: 0 2px
      font-size: 28px
      line-height: 1.18
</style>
