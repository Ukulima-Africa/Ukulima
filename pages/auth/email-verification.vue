<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="uku-green-bg">
      <q-page>
        <div class="row uku-row uku-signup-page uku-welcome-bg-image">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-welcome">
              <div class="row items-center no-wrap">
                <div class="uku-welcome-title">Account Verification</div>
              </div>
              <div class="row items-center justify-center no-wrap" align="center">
                <div class="uku-welcome-title-text">Email address to receive your verification link</div>
              </div>
              <div class="row no-wrap items-center justify-center" align="center">
                <q-form ref="sendEmailVerificationForm" class="q-gutter-md uku-form" autocomplete="off" @submit="sendEmailVerificationLink">
                  <div class="self-center full-width no-outline">
                    <q-input
                      v-model="email"
                      outlined
                      name="email"
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
                    <q-btn class="uku-signup-button" label="Resend Link" type="submit" tabindex="2" />
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
/* Axios */
import axios from 'axios'
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
    async sendEmailVerificationLink() {
      const that = this
      that.loading = true
      /* Send an email verification link request to our cloud function, since firebase js sdk does not have that function */
      const success = axios
        .post(process.env.resend_emailVerification, {
          email: that.email,
        })
        .then((res) => {
          return true
        })
        .catch((err) => {
          console.log('err', err)
          return false
        })

      if (success) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Verification email link has been sent!',
        })
      }
      /* Clear forms and validations */
      that.$refs.sendEmailVerificationForm.resetValidation()
      that.$refs.sendEmailVerificationForm.reset()
      that.loading = false
      /* Redirect to Sign in again */
      $nuxt.$router.push('/auth/signin')
    },
  },
}
</script>
<style lang="sass" scoped>
.uku-signup-page
  min-height: inherit
  margin: 0 auto
  padding: 0
.uku-welcome-bg-image
  background-image: url('~assets/images/Agriculture-Supply-Chain.png')
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
    background-image: url('~assets/images/Agriculture-Supply-Chain.png')
    background-size: cover
    .uku-welcome
      width: 90%
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
</style>
