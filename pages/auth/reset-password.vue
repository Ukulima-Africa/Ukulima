<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="white-bg">
      <q-page>
        <div class="row uku-row uku-signup-page uku-welcome-bg-image">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-welcome">
              <div class="row items-center no-wrap">
                <div class="uku-welcome-title">Password Reset</div>
              </div>
              <div class="row items-center justify-center no-wrap" align="center">
                <div class="uku-welcome-title-text">Use your email to reset your password</div>
              </div>
              <div class="row no-wrap items-center justify-center" align="center">
                <q-form ref="sendPasswordResetForm" class="q-gutter-md uku-form" autocomplete="off" @submit="sendPasswordResetLink">
                  <div class="self-center full-width no-outline">
                    <q-input
                      v-model="email"
                      outlined
                      type="email"
                      label="Email"
                      label-color="grey"
                      placeholder="Email"
                      color="black"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please enter your email address to continue']"
                      no-error-icon
                      autocomplete="email"
                      tabindex="1"
                    />
                  </div>
                  <div class="self-center full-width no-outline">
                    <q-btn class="uku-signup-button" label="Reset Password" type="submit" tabindex="2" />
                  </div>
                </q-form>
              </div>
              <div class="row items-center no-wrap">
                <div class="uku-welcome-text">
                  Already have an account?
                  <nuxt-link to="/auth/signin" class="uku-welcome-link">Sign in ›</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script>
/* Components */
import HeaderLogo from '../../components/HeaderLogo.vue'
import Footer from '../../components/Footer.vue'
/* LFG */
export default {
  components: {
    HeaderLogo,
    Footer,
  },
  data() {
    return {
      page: 'login',
      loading: false,
      showEmailNotice: false,
      email: '',
    }
  },
  methods: {
    sendPasswordResetLink() {
      this.loading = true
      // send a password reset link request via the firebase SDK
      $nuxt.$fire.auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          // success
          // show some sort of success thing so the user knows :p
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Password reset email link sent',
          })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          // show notification that something went wrong maybe ?
          console.error(errorCode)
          console.error(errorMessage)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error Creating Account: ${errorMessage}`,
          })
          this.$log.error(error)
        })

      this.$refs.sendPasswordResetForm.resetValidation()
      this.$refs.sendPasswordResetForm.reset()
      this.loading = false
    },
  },
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/theme-variables"

.uku-signup-page
  min-height: inherit
  margin: 0 auto
  padding: 0
.uku-welcome-bg-image
  background-image: url('~/assets/images/Agriculture-Supply-Chain.png')
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  overflow: display
.uku-welcome
  width: 549px
  border-radius: 5px
  border: solid 1px #cecece
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
  background-color: #ffffff
  margin: 0
  padding: 30px 20px
  .uku-welcome-title
    color: #000000
    font-size: 36px
    line-height: 1.22
    font-weight: bold
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin: 0 auto 15px
  .uku-welcome-title-text
    color: #333333
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
  .uku-signup-button
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
    background-color: $secondary
    cursor: pointer
  .uku-welcome-text
    width: 100%
    color: #575d64
    font-size: 14px
    line-height: 1.57
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin: 20px auto 0
    .uku-welcome-link
      color: $black
      font-weight: bold
      text-decoration: none
  .uku-link
    color: $black
    font-size: 14px
    font-weight: bold
    line-height: 1.57
    margin-left: 5px
// $breakpoint-xs: 479px !default
@media only screen and (max-width : 479px)
  .uku-signup-page
    min-height: 500px
    overflow: hidden
  .uku-welcome-bg-image
    background-image: url('~assets/images/signup-graphic.png')
    background-size: cover
    .uku-welcome
      width: 90%
      padding: 15px
    .uku-form
      width: 100%
      margin-left: auto
      margin-right: auto
      .uku-signup-button
        width: 100%
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-page-container
    padding-top: 100px !important
    padding-bottom: 0 !important
  .uku-signup-page
    overflow: hidden
  .uku-welcome-bg-image
    background-image: none
  .uku-welcome
    width: 100%
    border-radius: 0
    box-shadow: none !important
    padding: 15px
    .uku-welcome-title
      font-size: 34px
      line-height: 1.21
      margin: 40px auto 34px
</style>
